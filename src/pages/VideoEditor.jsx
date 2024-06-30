import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import {
  Button as BootstrapButton,
  Modal,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";

import placeholder from "../assets/placeholder_pc.png";
import VideoPlayer from "../components/VideoPlayer";
import MultiRangeSlider from "../components/MultiRangeSlider";
import VideoConversionButton from "../components/VideoConversionButton";

const ffmpeg = new FFmpeg({ log: true });

const VideoEditor = () => {
  const uploadFile = useRef("");
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [videoFile, setVideoFile] = useState();

  useEffect(() => {
    ffmpeg.load().then(() => {
      setFFmpegLoaded(true);
    });
  }, []);

  return (
    <Container>
      {/* 비디오 파일이 있는 경우 - reupload 활성화 */}
      {videoFile && (
        <ReUploadContainer>
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            ref={uploadFile}
          />
          <ReUploadButton onClick={() => uploadFile.current.click()}>
            비디오 재선택
          </ReUploadButton>
        </ReUploadContainer>
      )}

      {/* 파일 있으면 재생, 없으면 업로드 버튼 활성화 */}
      {!videoFile ? (
        <VideoPlayer />
      ) : (
        <>
          <Placeholder src={placeholder} alt="비디오를 업로드 해주세요" />
          <UploadContainer>
            <input
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              ref={uploadFile}
            />

            <UploadButton onClick={() => uploadFile.current.click()}>
              비디오 업로드하기
            </UploadButton>
          </UploadContainer>
        </>
      )}

      {/* 파일이 있을 경우 슬라이더 보여주기 */}
      {!videoFile && (
        <>
          <MultiRangeSlider
            min={0}
            max={100}
            onChange={({ min, max }) => {
              setSliderValues([min, max]);
            }}
          />

          <VideoConversionButton />
        </>
      )}
    </Container>
  );
};

export default VideoEditor;

const Container = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReUploadContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const ReUploadButton = styled(BootstrapButton)`
  width: 30%;
  border-radius: 8px;
  background: #383838;
  color: #fff;
  padding: 8px;
  font-size: 13px;
  font-weight: 700;
  border: none;

  &:hover,
  &:focus,
  &:active {
    background: #5e88f4 !important;
    border: none !important;
  }
`;

const Placeholder = styled.img`
  width: 100%;
  margin-bottom: 3rem;
`;

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const UploadButton = styled(BootstrapButton)`
  width: 50%;
  border-radius: 8px;
  background: #383838;
  color: #fff;
  padding: 16px 8px;
  font-size: 16px;
  font-weight: 700;
  border: none;

  &:hover,
  &:focus,
  &:active {
    background: #5e88f4 !important;
    border: none !important;
  }
`;

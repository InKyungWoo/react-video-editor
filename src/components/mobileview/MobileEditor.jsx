import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Button as BootstrapButton } from "react-bootstrap";

import placeholder from "../../assets/placeholder_mobile.png";
import VideoPlayer from "../VideoPlayer";
import Slider from "../Slider";
import VideoConversionButton from "../VideoConversionButton";
import { sliderValueToVideoTime } from "../../utils/utils";

import ModalComponent from "../ModalComponent";
import ToastComponent from "../ToastComponent";

const ffmpeg = new FFmpeg({ log: true });

const MobileEditor = () => {
  const uploadFile = useRef("");
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [videoFile, setVideoFile] = useState();

  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [videoPlayer, setVideoPlayer] = useState();

  const [processing, setProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [progress, setProgress] = useState(0);

  // ffmpeg 로딩 상태 업데이트
  useEffect(() => {
    ffmpeg.load().then(() => {
      setFFmpegLoaded(true);
    });
  }, []);

  // 비디오 재생 시간 설정
  useEffect(() => {
    const min = sliderValues[0];

    if (min !== undefined && videoPlayerState && videoPlayer) {
      videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
    }
  }, [sliderValues]);

  // 비디오 재생 범위 설정
  useEffect(() => {
    if (videoPlayer && videoPlayerState) {
      const [min, max] = sliderValues;

      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      if (videoPlayerState.currentTime < minTime) {
        videoPlayer.seek(minTime);
      }
      if (videoPlayerState.currentTime > maxTime) {
        videoPlayer.seek(minTime);
      }
    }
  }, [videoPlayerState]);

  // 비디오 파일이 없으면 비디오 플레이어 상태 초기화
  useEffect(() => {
    if (!videoFile) {
      setVideoPlayerState(undefined);
    }
  }, [videoFile]);

  // 변환 진행 상태를 반영하여 ProgressBar 갱신
  useEffect(() => {
    const timer = setInterval(() => {
      if (processing) {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 10
        );
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [processing]);

  return (
    <Container>
      {/* 비디오 파일이 있는 경우 - reupload 활성화 */}
      {videoFile && (
        <ReUploadContainer>
          <input
            onChange={(e) => setVideoFile(e.target.files[0])}
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
      {videoFile ? (
        <VideoPlayer
          src={videoFile}
          onPlayerChange={(videoPlayer) => {
            setVideoPlayer(videoPlayer);
          }}
          onChange={(videoPlayerState) => {
            setVideoPlayerState(videoPlayerState);
          }}
        />
      ) : (
        <>
          <Placeholder src={placeholder} alt="비디오를 업로드 해주세요" />
          <UploadContainer>
            <input
              onChange={(e) => setVideoFile(e.target.files[0])}
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
      {videoFile && (
        <>
          <Slider
            min={0}
            max={100}
            onChange={({ min, max }) => {
              setSliderValues([min, max]);
            }}
          />

          <ButtonContainer>
            <VideoConversionButton
              onConversionStart={() => {
                setProcessing(true);
              }}
              onConversionEnd={() => {
                setProcessing(false);
                setShowToast(true);
                setProgress(0);
              }}
              ffmpeg={ffmpeg}
              videoPlayerState={videoPlayerState}
              sliderValues={sliderValues}
              videoFile={videoFile}
            />
          </ButtonContainer>
        </>
      )}

      <ToastComponent showToast={showToast} setShowToast={setShowToast} />
      <ModalComponent
        processing={processing}
        setProcessing={setProcessing}
        progress={progress}
      />
    </Container>
  );
};

export default MobileEditor;

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
  width: 25%;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledVideoConversionButton = styled(VideoConversionButton)`
  width: 80%;
  max-width: 300px;
  border-radius: 8px;
  padding: 16px 8px;
  font-size: 16px;
  font-weight: 700;

  &:hover,
  &:focus,
  &:active {
    background: #5e88f4 !important;
    border: none !important;
  }
`;

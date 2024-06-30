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
import { sliderValueToVideoTime } from "../utils/utils";

const ffmpeg = new FFmpeg({ log: true });

const VideoEditor = () => {
  const uploadFile = useRef("");
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [videoFile, setVideoFile] = useState();

  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [videoPlayer, setVideoPlayer] = useState();

  const [processing, setProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    ffmpeg.load().then(() => {
      setFFmpegLoaded(true);
    });
  }, []);

  useEffect(() => {
    const min = sliderValues[0];

    if (min !== undefined && videoPlayerState && videoPlayer) {
      videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
    }
  }, [sliderValues]);

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

  useEffect(() => {
    if (!videoFile) {
      setVideoPlayerState(undefined);
    }
  }, [videoFile]);

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
          <MultiRangeSlider
            min={0}
            max={100}
            onChange={({ min, max }) => {
              setSliderValues([min, max]);
            }}
          />

          <VideoConversionButton
            onConversionStart={() => {
              setProcessing(true);
            }}
            onConversionEnd={() => {
              setProcessing(false);
              setShowModal(true);
            }}
            ffmpeg={ffmpeg}
            videoPlayerState={videoPlayerState}
            sliderValues={sliderValues}
            videoFile={videoFile}
          />
        </>
      )}
      <StyledToastContainer>
        <StyledToast
          onClose={() => setShowModal(false)}
          show={showModal}
          delay={2000}
          autohide
        >
          <StyledToastHeader closeButton={false}>
            <strong className="me-auto">Video Editor</strong>
          </StyledToastHeader>
          <StyledToastBody>내보내기가 완료되었습니다.</StyledToastBody>
        </StyledToast>
      </StyledToastContainer>

      <StyledModal
        show={processing}
        onHide={() => setProcessing(false)}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"
      >
        <ModalContent>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>

          <ModalText>내보내기가 진행중입니다.</ModalText>
        </ModalContent>
      </StyledModal>
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

const StyledToastContainer = styled.div`
  z-index: 1;
  top: 20px;
  right: 20px;
`;

const StyledToast = styled(Toast)`
  background-color: #343a40;
  color: #fff;
`;

const StyledToastHeader = styled(Toast.Header)`
  background-color: #343a40;
  color: #fff;
`;

const StyledToastBody = styled(Toast.Body)`
  background-color: #343a40;
  color: #fff;
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: #343a40;
    color: #fff;
  }
`;

const ModalContent = styled.div`
  text-align: center;
`;

const ModalText = styled.p`
  margin-top: 16px;
  font-size: 14px;
  font-weight: 600;
  color: #c8c8c8;
`;

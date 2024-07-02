import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { readFileAsBase64, sliderValueToVideoTime } from "../utils/utils";

import out from "../assets/icons/out.svg";
import dark_download from "../assets/icons/dark_download.svg";
import audio from "../assets/icons/audio.svg";

function VideoConversionButton({
  videoPlayerState,
  sliderValues,
  videoFile,
  onConversionStart = () => {},
  onConversionEnd = () => {},
  onGifCreated = () => {},
  onAudioExtracted = () => {},
}) {
  // Initialize ffmpeg instance
  const [ffmpeg, setFfmpeg] = useState(null);

  useEffect(() => {
    const loadFfmpeg = async () => {
      const ffmpegInstance = new FFmpeg();
      await ffmpegInstance.load();
      setFfmpeg(ffmpegInstance);
    };

    loadFfmpeg();
  }, []);

  // GIF 내보내기
  const convertToGif = async () => {
    // starting the conversion process
    onConversionStart(true);

    const inputFileName = "input.mp4";
    const outputFileName = "output.gif";

    // writing the video file to memory
    const inputData = await fetchFile(videoFile);
    await ffmpeg.writeFile(inputFileName, inputData);

    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

    await ffmpeg.exec([
      "-i",
      inputFileName,
      "-ss",
      `${minTime}`,
      "-to",
      `${maxTime}`,
      "-f",
      "gif",
      outputFileName,
    ]);

    // reading the resulting file
    const data = await ffmpeg.readFile(outputFileName);
    const gifUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );

    const link = document.createElement("a");
    link.href = gifUrl;
    link.setAttribute("download", "");
    link.click();

    // ending the conversion process
    onConversionEnd(false);
  };

  // 비디오 자르기
  const onCutTheVideo = async () => {
    onConversionStart(true);

    const inputFileName = "input.mp4";
    const outputFileName = "output.mp4";

    const inputData = await fetchFile(videoFile);
    await ffmpeg.writeFile(inputFileName, inputData);

    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

    await ffmpeg.exec([
      "-ss",
      `${minTime}`,
      "-i",
      inputFileName,
      "-t",
      `${maxTime - minTime}`,
      "-c",
      "copy",
      outputFileName,
    ]);

    const data = await ffmpeg.readFile(outputFileName);
    const dataURL = await readFileAsBase64(
      new Blob([data.buffer], { type: "video/mp4" })
    );

    const link = document.createElement("a");
    link.href = dataURL;
    link.setAttribute("download", "");
    link.click();

    onConversionEnd(false);
  };

  // 음성 추출하기
  const extractAudio = async () => {
    onConversionStart(true);

    const inputFileName = "input.mp4";
    const outputFileName = "output.mp3";

    const inputData = await fetchFile(videoFile);
    await ffmpeg.writeFile(inputFileName, inputData);

    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

    await ffmpeg.exec([
      "-ss",
      `${minTime}`,
      "-i",
      inputFileName,
      "-t",
      `${maxTime - minTime}`,
      "-ab",
      "320k",
      "-ar",
      "44100",
      "-y",
      outputFileName,
    ]);

    const data = await ffmpeg.readFile(outputFileName);
    const audioUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: "audio/mpeg" })
    );

    const link = document.createElement("a");
    link.href = audioUrl;
    link.setAttribute("download", "");
    link.click();

    onAudioExtracted();

    onConversionEnd(false);
  };

  return (
    <Container>
      <StyledButton onClick={convertToGif}>
        <img src={out} alt="GIF 내보내기" />
        <p>GIF 내보내기</p>
      </StyledButton>

      <StyledButton onClick={extractAudio}>
        <img src={audio} alt="음성 파일 추출하기" />
        <p>음성 파일 추출하기</p>
      </StyledButton>

      <StyledButton onClick={onCutTheVideo}>
        <img src={dark_download} alt="비디오 저장하기" />
        <p>비디오 저장하기</p>
      </StyledButton>
    </Container>
  );
}

export default VideoConversionButton;

const Container = styled.div`
  display: flex;
  width: 60rem;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
  width: 50%;
  border-radius: 8px;
  color: #fff;
  background-color: #f5f5f5;
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

  img {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
  }

  p {
    color: #383838;
    font-size: 16px;
    font-weight: 700;
    margin: 0;
  }
`;

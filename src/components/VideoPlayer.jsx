import React, { useEffect, useState } from "react";
import { Player, BigPlayButton, LoadingSpinner, ControlBar } from "video-react";
import styled from "styled-components";
import "video-react/dist/video-react.css";

const VideoPlayer = ({
  src,
  onPlayerChange = () => {},
  onChange = () => {},
  startTime = undefined,
}) => {
  const [player, setPlayer] = useState(undefined);
  const [playerState, setPlayerState] = useState(undefined);
  const [source, setSource] = useState();

  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    setSource(URL.createObjectURL(src));
  }, [src]);

  useEffect(() => {
    if (playerState) {
      onChange(playerState);
    }
  }, [playerState]);

  useEffect(() => {
    onPlayerChange(player);

    if (player) {
      player.subscribeToStateChange(handleStateChange);
      player.subscribeToStateChange(setPlayerState);
      player.load();
    }
  }, [player]);

  const handleStateChange = (state, prevState) => {
    if (state.duration !== totalDuration) {
      setTotalDuration(state.duration);
    }
    setCurrentTime(state.currentTime);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) {
      return "00:00";
    }
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <VideoContainer>
      <Player
        ref={(player) => {
          setPlayer(player);
        }}
        startTime={startTime}
        src={source}
      >
        <source src={source} />
        <BigPlayButton position="center" />
        <CustomLoadingSpinner />
        <ControlBar disableCompletely />
        <TimeDisplay>
          {formatTime(currentTime)} / {formatTime(totalDuration)}
        </TimeDisplay>
      </Player>
    </VideoContainer>
  );
};

export default VideoPlayer;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
`;

const CustomLoadingSpinner = styled(LoadingSpinner)`
  .video-react-spinner {
    width: 50px;
    height: 50px;
  }
`;

const TimeDisplay = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px;
  background-color: #555;
  color: #fff;
  font-size: 14px;
  z-index: 1;
`;

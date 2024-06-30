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
  const [player, setPlayer] = useState();
  const [playerState, setPlayerState] = useState(undefined);
  const [source, setSource] = useState();

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
      player.subscribeToStateChange(setPlayerState);
    }
  }, [player]);

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

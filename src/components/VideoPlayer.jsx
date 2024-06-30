import React, { useEffect, useState } from "react";
import { Player, BigPlayButton, LoadingSpinner, ControlBar } from "video-react";
import styled from "styled-components";
import "video-react/dist/video-react.css";

const VideoPlayer = ({ src }) => {
  const [player, setPlayer] = useState();
  const [source, setSource] = useState();

  return (
    <VideoContainer>
      <Player
        ref={(player) => {
          setPlayer(player);
        }}
        src={source}
      >
        <source src={source} />
        <CustomBigPlayButton position="center" />
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
  max-width: 800px;
  margin: 0 auto;
`;

const CustomBigPlayButton = styled(BigPlayButton)`
  background-color: rgba(0, 0, 0, 0.5);
`;

const CustomLoadingSpinner = styled(LoadingSpinner)`
  .video-react-spinner {
    width: 50px;
    height: 50px;
  }
`;

import { useEffect, useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player/soundcloud";

import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10% 10% 5% 10%;
`;
const MusicWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
`;
const MusicPlay = styled(ReactPlayer)`
  width: 100%;
  border-radius: 20px;
  pointer-events: none; /* Disable pointer events */
`;

const PlayButton = styled.div`
  color: color;
  font-size: 50px;
  margin-top: 5%;
`;

const songUrlList = [
  "https://soundcloud.com/chillhopdotcom/kreatev-street-glow",
  "https://soundcloud.com/chillhopdotcom/lindecis-x-sad-toi-melting-ice",
  "https://soundcloud.com/chillhopdotcom/birocratic-saib-odyssee",
  "https://soundcloud.com/chillhopdotcom/nymano-mirage-full-album",
  "https://soundcloud.com/chillhopdotcom/screen-jazzmaster-eehou-downtown",
];
function Music() {
  const [playAudio, setPlayAudio] = useState(false);
  const [songUrl, setSongUrl] = useState("");

  const togglePlayBtn = () => {
    setPlayAudio((prev) => !prev);
  };

  useEffect(() => {
    setSongUrl(songUrlList[Math.floor(Math.random() * songUrlList.length)]);
  }, []);

  return (
    <Wrapper>
      <MusicWrapper>
        <MusicPlay
          //   url={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
          url={songUrl}
          width="100%"
          height="100%"
          playing={playAudio}
          onEnded={togglePlayBtn}
          playIcon={<PlayCircleFilledWhiteOutlinedIcon fontSize="large" />}
        />
      </MusicWrapper>
      <PlayButton onClick={togglePlayBtn}>
        {playAudio ? (
          <PauseCircleOutlineOutlinedIcon fontSize="" />
        ) : (
          <PlayCircleFilledWhiteOutlinedIcon fontSize="" />
        )}
      </PlayButton>
    </Wrapper>
  );
}

export default Music;

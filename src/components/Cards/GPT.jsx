import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { searchVideos } from "../../utils/gpt/youtube";
import ReactPlayer from "react-player/youtube";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;
const MusicPlay = styled(ReactPlayer)`
  border-radius: 20px;
`;

function GPT() {
  const query = "쏜애플 서울";
  const [videoId, setVideoId] = useState("");
  useEffect(() => {
    const getVideoId = async () => {
      const videoId = await searchVideos(query + " music");
      setVideoId(videoId);
    };
    getVideoId();
  }, []);

  return (
    <Wrapper>
      <MusicPlay
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="100%"
        style={{ borderRadius: "inherit", overflow: "hidden" }}
        playing={true}
      />
    </Wrapper>
  );
}

export default GPT;

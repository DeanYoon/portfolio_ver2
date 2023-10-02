import { useEffect, useState } from "react";
import styled from "styled-components";
import { searchVideos } from "../../utils/gpt/youtube";
import ReactPlayer from "react-player/youtube";
import { musicRecommend } from "../../utils/gpt/gpt";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
`;
const MusicPlay = styled(ReactPlayer)`
  border-radius: 20px;
`;

function GPT() {
  const [keyword, setKeyword] = useState("");
  const [videoId, setVideoId] = useState("");
  const [prompt, setPrompt] = useState("I feel welcome to the jungle rock ");

  useEffect(() => {
    const getMusicRecommendation = async () => {
      const gptResult = await musicRecommend(prompt);
      setKeyword(gptResult);
    };
    getMusicRecommendation();
  }, []);

  useEffect(() => {
    const getVideoId = async () => {
      const videoId = await searchVideos(keyword + " music");
      setVideoId(videoId);
    };
    keyword && getVideoId();
  }, [keyword]);
  return (
    <Wrapper>
      {videoId ? (
        <MusicPlay
          url={`https://www.youtube.com/watch?v=${videoId}`}
          width="100%"
          height="100%"
          style={{ borderRadius: "inherit", overflow: "hidden" }}
          playing={true}
        />
      ) : (
        <div>Token Expired</div>
      )}
    </Wrapper>
  );
}

export default GPT;

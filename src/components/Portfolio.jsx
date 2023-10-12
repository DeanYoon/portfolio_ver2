import styled from "styled-components";
import projectData from "../projectData";
import { useRecoilValue } from "recoil";
import { language } from "../atoms";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2%;
  color: white;
`;
const PortfolioImg = styled.img`
  width: 65%;
  height: 100%;
  border-radius: 30px;
`;
const PortFolioContent = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow-y: scroll;
  div {
    margin-bottom: 20px;
  }
`;
const Title = styled.div`
  font-size: 30px;
`;
const Skills = styled.div`
  font-size: 20px;
`;
const Explain = styled.div`
  line-height: 25px;
`;
function Portfolio({ selectedCardLayoutId }) {
  const project = projectData[selectedCardLayoutId];
  const isEng = useRecoilValue(language);

  const { title, imgUrl, frontendSkills, backendSkills, explanation } = project;

  return (
    <Wrapper>
      <PortfolioImg src={imgUrl} />
      <PortFolioContent>
        <Title>{isEng ? title.en : title.ko}</Title>
        <Skills>
          <div>Front : {frontendSkills}</div>
          <div>Back : {backendSkills}</div>
        </Skills>

        <Explain>{isEng ? explanation.en : explanation.ko}</Explain>
      </PortFolioContent>
    </Wrapper>
  );
}

export default Portfolio;

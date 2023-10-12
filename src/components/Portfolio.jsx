import styled from "styled-components";
import projectData from "../projectData";
import { useRecoilValue } from "recoil";
import { language } from "../atoms";
import PublicIcon from "@mui/icons-material/Public";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
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

const LinkWrapper = styled.div`
  display: flex;
`;

const Link = styled.a`
  color: white;
  margin: 10px;
`;
function Portfolio({ selectedCardLayoutId }) {
  const project = projectData[selectedCardLayoutId];
  const isEng = useRecoilValue(language);

  const {
    title,
    imgUrl,
    frontendSkills,
    backendSkills,
    explanation,
    projectURL,
  } = project;

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

        <LinkWrapper>
          <Link href={projectURL.live} target="_blank">
            <PublicIcon fontSize="large" />
          </Link>
          <Link href={projectURL.github} target="_blank">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </Link>
        </LinkWrapper>
      </PortFolioContent>
    </Wrapper>
  );
}

export default Portfolio;

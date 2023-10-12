import styled from "styled-components";
import projectData from "../../projectData";
import { useRecoilValue } from "recoil";
import { language } from "../../atoms";

const Wrapper = styled.div`
  padding: 5%;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  max-height: 250px;
  border-radius: 10px;
  box-shadow: 0px 0px 30px -10px black;
`;

const Title = styled.div`
  font-size: 50px;
  text-align: center;
  margin-top: 30px;
`;
function PortfolioCard({ project }) {
  const data = projectData[project];
  const isEng = useRecoilValue(language);
  const { title, imgUrl } = data;

  return (
    <Wrapper>
      <Img src={imgUrl} />
      <Title>{isEng ? title.en : title.ko}</Title>
    </Wrapper>
  );
}

export default PortfolioCard;

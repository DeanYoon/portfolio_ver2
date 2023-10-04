import { styled } from "styled-components";
import { maxWidthValue } from "../../config";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"; // Import the envelope icon from the regular category
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import { language } from "../../atoms";
import textData, { addressEng, addressKor } from "./text";

const Wrapper = styled.div`
  background-color: #f1e6e4;
  max-width: ${maxWidthValue};
  min-width: 400px;
  width: 100%;
  /* height: 300px; */
  border-radius: 30px;
  padding: 10%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); /* Adjust column size as needed */
  grid-row-gap: 100px; /* Add vertical gap between grid items */
`;
const Grid = styled.div`
  margin: 10px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const Content = styled.div`
  color: #888888;
`;

function Bottom() {
  const isEng = useRecoilValue(language);
  return (
    <Wrapper>
      <GridContainer>
        <Grid>
          <Title>Location</Title>
          <Content>
            {isEng ? textData.address.eng : textData.address.kor}
          </Content>
        </Grid>
        <Grid>
          <Title>Github</Title>
          <Content>
            <a href="https://github.com/deanyoon" target="_blank">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </Content>
        </Grid>
        <Grid>
          <Title>Contact</Title>
          <Content>
            {" "}
            <a
              href="https://www.linkedin.com/in/jesung-yoon-123287235/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=deantube8078@gmail.com"
              target="_blank"
            >
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </Content>
        </Grid>
        <Grid>
          <Title>Social Media</Title>
          <Content>
            {" "}
            <a href="https://www.instagram.com/yoon_dean/" target="_blank">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </Content>
        </Grid>
      </GridContainer>
    </Wrapper>
  );
}

export default Bottom;

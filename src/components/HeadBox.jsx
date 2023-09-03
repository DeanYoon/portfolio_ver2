import { styled } from "styled-components";
import Topic from "./Topic";
import { maxWidthValue } from "../config";

const Wrapper = styled.div`
  background-color: #f1e6e4;
  max-width: ${maxWidthValue};
  min-width: 400px;
  width: 100%;
  height: 800px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div``;
const Bottom = styled.div``;
const ColorButton = styled.div``;

function HeadBox() {
  return (
    <Wrapper>
      <Topic />
      <Main>Dean</Main>
      <Bottom>about</Bottom>
      <ColorButton>buttons</ColorButton>
    </Wrapper>
  );
}

export default HeadBox;

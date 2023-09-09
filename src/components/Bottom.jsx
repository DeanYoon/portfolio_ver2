import { styled } from "styled-components";
import { maxWidthValue } from "../config";

const Wrapper = styled.div`
  background-color: #f1e6e4;
  max-width: ${maxWidthValue};
  min-width: 400px;
  width: 100%;
  height: 600px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Bottom() {
  return <Wrapper>Bottom</Wrapper>;
}

export default Bottom;

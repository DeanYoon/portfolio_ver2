import { styled } from "styled-components";

const Top = styled.div`
  background-color: #56d270;
  padding: 10px 20px;
  border-radius: 10px;
`;

function Topic() {
  const currentYear = new Date().getFullYear();

  return <Top>{currentYear}</Top>;
}

export default Topic;

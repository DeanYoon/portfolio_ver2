import { styled } from "styled-components";
import { maxWidthValue } from "../config";
import { useEffect, useState } from "react";

const columnWidth = "250px";
const row_increment = "10px";

const Wrapper = styled.div`
  max-width: ${maxWidthValue};
  width: 100%;
  margin: 40px 0;

  columns: ${(props) => props.widthColumn};
`;

const Card = styled.div`
  background-color: white;
  border: 1px solid black;
  break-inside: avoid;
  max-width: 200px;
  height: 500px;
  transition: all 0.2s ease-in-out;
  border-radius: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  &:hover {
    transform: scale(1.03);
  }
`;

const Card2 = styled(Card)`
  height: 400px;
`;
const Card3 = styled(Card)`
  height: 700px;
`;

function Main() {
  const [widthColumn, setWidthColumn] = useState(2);

  const updateColumnNumber = () => {
    if (window.innerWidth > 1400) {
      setWidthColumn(3);
    } else if (window.innerWidth > 900) {
      setWidthColumn(2);
    } else {
      setWidthColumn(1);
    }
  };

  useEffect(() => {
    updateColumnNumber(); // Initial call to set the column number
    window.addEventListener("resize", updateColumnNumber);
    return () => {
      window.removeEventListener("resize", updateColumnNumber);
    };
  }, []);
  return (
    <Wrapper widthColumn={widthColumn}>
      <Card />
      <Card3 />
      {/* <Card2 />
      <Card2 />
      <Card3 />
      <Card />
      <Card />
      <Card2 /> */}
      <Card />
    </Wrapper>
  );
}

export default Main;

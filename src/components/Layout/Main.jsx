import { styled } from "styled-components";
// import { maxWidthValue } from "../../config";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

// const columnWidth = "250px";
// const row_increment = "10px";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 20px auto;
  padding-top: 20px;
  columns: ${({ widthColumn }) => widthColumn};
  column-gap: 50px;
`;
export const Card = styled.div`
  width: 100%;

  margin-bottom: 30px;
  break-inside: avoid;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  background-color: white;
  height: 500px;
  transition: all 0.2s ease-in-out;
  border-radius: 30px;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`;
const Card2 = styled(Card)`
  height: 200px;
  background-color: red;
`;
const Card3 = styled(Card)`
  height: 800px;
  background-color: yellow;
`;

function Main() {
  const [widthColumn, setWidthColumn] = useState(2);
  const { ref: card1Ref, inView: card1IsVisible } = useInView();
  const { ref: card2Ref, inView: card2IsVisible } = useInView();
  const { ref: card3Ref, inView: card3IsVisible } = useInView();
  const { ref: card4Ref, inView: card4IsVisible } = useInView();
  const { ref: card5Ref, inView: card5IsVisible } = useInView();
  const { ref: card6Ref, inView: card6IsVisible } = useInView();
  const { ref: card7Ref, inView: card7IsVisible } = useInView();
  const { ref: card8Ref, inView: card8IsVisible } = useInView();
  const { ref: card9Ref, inView: card9IsVisible } = useInView();

  const myRef = useRef();
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
      <Card isVisible={card1IsVisible} ref={card1Ref} />
      <Card3 isVisible={card2IsVisible} ref={card2Ref} />
      <Card2 isVisible={card3IsVisible} ref={card3Ref} />
      <Card2 isVisible={card4IsVisible} ref={card4Ref} />
      <Card3 isVisible={card5IsVisible} ref={card5Ref} />
      <Card isVisible={card6IsVisible} ref={card6Ref} />
      <Card isVisible={card7IsVisible} ref={card7Ref} />
      <Card2 isVisible={card8IsVisible} ref={card8Ref} />
      <Card isVisible={card9IsVisible} ref={card9Ref} />
    </Wrapper>
  );
}

export default Main;

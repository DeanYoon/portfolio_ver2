import { styled } from "styled-components";
// import { maxWidthValue } from "../../config";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Content1 from "../Cards/Content1";
import { Card } from "../Cards/config";

// const columnWidth = "250px";
// const row_increment = "10px";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 20px auto;
  padding-top: 20px;
  columns: ${({ widthColumn }) => widthColumn};
  column-gap: 50px;
  perspective: 800px;
`;

const Card2 = styled(Card)`
  height: 200px;
  background-color: red;
`;
const Card3 = styled(Card)`
  height: 600px;
  background-color: yellow;
`;

const Card4 = styled(Card)`
  height: 400px;
  background-color: greenyellow;

  transform: ${({ isVisible, isScrollingDown }) => {}};
`;

function Main() {
  const [widthColumn, setWidthColumn] = useState(2);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isScrollingLeft, setIsScrollingLeft] = useState(false);
  const { ref: card1Ref, inView: card1IsVisible } = useInView();
  const { ref: card2Ref, inView: card2IsVisible } = useInView();
  const { ref: card3Ref, inView: card3IsVisible } = useInView();
  const { ref: card4Ref, inView: card4IsVisible } = useInView();
  const { ref: card5Ref, inView: card5IsVisible } = useInView();
  const { ref: card6Ref, inView: card6IsVisible } = useInView();
  const { ref: card7Ref, inView: card7IsVisible } = useInView();
  const { ref: card8Ref, inView: card8IsVisible } = useInView();
  const { ref: card9Ref, inView: card9IsVisible } = useInView();
  const { ref: card10Ref, inView: card10IsVisible } = useInView();
  const { ref: card11Ref, inView: card11IsVisible } = useInView();

  const updateColumnNumber = () => {
    if (window.innerWidth > 1400) {
      setWidthColumn(3);
    } else if (window.innerWidth > 900) {
      setWidthColumn(2);
    } else {
      setWidthColumn(1);
    }
  };

  // resize
  useEffect(() => {
    updateColumnNumber(); // Initial call to set the column number
    window.addEventListener("resize", updateColumnNumber);

    return () => {
      window.removeEventListener("resize", updateColumnNumber);
    };
  }, []);

  // useEffect(() => {
  //   console.log(isScrollingDown);
  // }, [isScrollingDown]);

  return (
    <Wrapper widthColumn={widthColumn}>
      <Card
        isVisible={card1IsVisible}
        isScrollingDown={isScrollingDown}
        ref={card1Ref}
      >
        <Content1 />
      </Card>
      <Card3
        isVisible={card2IsVisible}
        isScrollingDown={isScrollingDown}
        ref={card2Ref}
      ></Card3>
      <Card2
        isVisible={card3IsVisible}
        isScrollingDown={isScrollingDown}
        ref={card3Ref}
      ></Card2>

      <Card3
        isVisible={card5IsVisible}
        isScrollingDown={isScrollingDown}
        ref={card5Ref}
      ></Card3>
      <Card
        isVisible={card6IsVisible}
        isScrollingDown={isScrollingDown}
        ref={card6Ref}
      >
        {" "}
        <Content1 />
      </Card>
      <Card4
        isVisible={card7IsVisible}
        isScrollingDown={isScrollingDown}
        ref={card7Ref}
      ></Card4>
      <Card2
        isVisible={card8IsVisible}
        isScrollingDown={isScrollingDown}
        ref={card8Ref}
      ></Card2>
      <Card
        isVisible={card9IsVisible}
        isScrollingDown={isScrollingDown}
        ref={card9Ref}
      ></Card>
      <Card2
        isVisible={card4IsVisible}
        isScrollingDown={isScrollingDown}
        ref={card4Ref}
      ></Card2>
      <Card
        isVisible={card10IsVisible}
        isScrollingDown={isScrollingDown}
        ref={card10Ref}
      ></Card>
      <Card3
        isVisible={card11IsVisible}
        isScrollingDown={isScrollingDown}
        ref={card11Ref}
      ></Card3>
    </Wrapper>
  );
}

export default Main;

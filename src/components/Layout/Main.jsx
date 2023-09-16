import { styled } from "styled-components";
// import { maxWidthValue } from "../../config";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Weather from "../Cards/Weather";
import { CardStyle } from "../Cards/config";
import Music from "../Cards/Music";

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

const Card = styled(CardStyle)``;
const Card1 = styled(CardStyle)`
  background-color: white;
`;

const Card2 = styled(CardStyle)`
  height: 200px;
  background-color: red;
`;
const Card3 = styled(CardStyle)`
  height: 600px;
  background-color: yellow;
`;

const Card4 = styled(CardStyle)`
  height: 400px;
  background-color: greenyellow;
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

  return (
    <Wrapper widthColumn={widthColumn}>
      <Card isVisible={card1IsVisible} ref={card1Ref}>
        <Weather />
      </Card>
      <Card3 isVisible={card2IsVisible} ref={card2Ref}>
        <Music />
      </Card3>
      <Card2 isVisible={card3IsVisible} ref={card3Ref}></Card2>

      <Card3 isVisible={card5IsVisible} ref={card5Ref}></Card3>
      <Card1 isVisible={card6IsVisible} ref={card6Ref}>
        {" "}
        <Weather />
      </Card1>
      <Card4 isVisible={card7IsVisible} ref={card7Ref}></Card4>
      <Card2 isVisible={card8IsVisible} ref={card8Ref}></Card2>
      <Card1 isVisible={card9IsVisible} ref={card9Ref}></Card1>
      <Card2 isVisible={card4IsVisible} ref={card4Ref}></Card2>
      <Card1 isVisible={card10IsVisible} ref={card10Ref}></Card1>
      <Card3 isVisible={card11IsVisible} ref={card11Ref}></Card3>
    </Wrapper>
  );
}

export default Main;

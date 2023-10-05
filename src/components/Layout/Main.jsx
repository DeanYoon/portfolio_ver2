import { styled } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Weather from "../Cards/Weather/Weather";
import { CardStyle } from "../Cards/config";
import Music from "../Cards/Music";
import News from "../Cards/News";
import GPT from "../Cards/GPT";
import Prompt from "../Cards/Prompt";
import GuestNote from "../Cards/GuestNote/GuestNote";

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
  /* position: relative; */
`;

const Card = styled(CardStyle)``;
const Card1 = styled(CardStyle)`
  background-color: #f0e7e4;
`;

const Card2 = styled(CardStyle)`
  height: 200px;
  background-color: #c7beba;
`;
const Card3 = styled(CardStyle)`
  height: 600px;
  background-color: #fde440;
`;

const Card4 = styled(CardStyle)`
  height: 400px;
  background-color: #56d270;
`;

function Main({ toggleClick, selectedCardLayoutId, widthColumn }) {
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

  return (
    <Wrapper widthColumn={widthColumn}>
      <Card
        isVisible={card1IsVisible}
        ref={card1Ref}
        layoutId="card1Ref"
        selectedCard={selectedCardLayoutId === "card1Ref"}
      >
        <Weather />
      </Card>

      <Card3
        isVisible={card2IsVisible}
        ref={card2Ref}
        layoutId="card2Ref"
        selectedCard={selectedCardLayoutId === "card2Ref"}
        onClick={() => toggleClick("card2Ref")}
      ></Card3>

      <Card2
        isVisible={card3IsVisible}
        ref={card3Ref}
        layoutId="card3Ref"
        selectedCard={selectedCardLayoutId === "card3Ref"}
        // onClick={() => toggleClick("card3Ref")}
      >
        <Prompt />
      </Card2>

      <Card
        isVisible={card5IsVisible}
        ref={card5Ref}
        layoutId="card5Ref"
        selectedCard={selectedCardLayoutId === "card5Ref"}
        // onClick={() => toggleClick("card5Ref")}
      >
        <GPT />
      </Card>
      <Card1
        isVisible={card6IsVisible}
        ref={card6Ref}
        layoutId="card6Ref"
        selectedCard={selectedCardLayoutId === "card6Ref"}
      >
        <News />
      </Card1>
      <Card4
        isVisible={card7IsVisible}
        ref={card7Ref}
        layoutId="card7Ref"
        selectedCard={selectedCardLayoutId === "card7Ref"}
        onClick={() => toggleClick("card7Ref")}
      ></Card4>
      <Card2
        isVisible={card8IsVisible}
        ref={card8Ref}
        layoutId="card8Ref"
        selectedCard={selectedCardLayoutId === "card8Ref"}
        onClick={() => toggleClick("card8Ref")}
      ></Card2>
      <Card1
        isVisible={card9IsVisible}
        ref={card9Ref}
        layoutId="card9Ref"
        selectedCard={selectedCardLayoutId === "card9Ref"}
      >
        <Music />
      </Card1>
      <Card2
        isVisible={card4IsVisible}
        ref={card4Ref}
        layoutId="card4Ref"
        selectedCard={selectedCardLayoutId === "card4Ref"}
        onClick={() => toggleClick("card4Ref")}
      ></Card2>
      <Card1
        isVisible={card10IsVisible}
        ref={card10Ref}
        layoutId="card10Ref"
        selectedCard={selectedCardLayoutId === "card10Ref"}
        // onClick={() => toggleClick("card10Ref")}
      >
        {" "}
        <GuestNote />
      </Card1>
      <Card3
        isVisible={card11IsVisible}
        ref={card11Ref}
        layoutId="card11Ref"
        selectedCard={selectedCardLayoutId === "card11Ref"}
        onClick={() => toggleClick("card11Ref")}
      ></Card3>
    </Wrapper>
  );
}

export default Main;

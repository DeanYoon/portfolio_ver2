import { styled } from "styled-components";
import "./App.css";
import Main from "./components/Layout/Main";
import Bottom from "./components/Layout/Bottom";
import Top from "./components/Layout/Top";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FocusedBackground = styled.div`
  position: fixed;
  background-color: black;
  opacity: 0.3;
  width: 100vw;
  height: 100%;
  top: 0;
`;

const Focused = styled(motion.div)`
  opacity: 1;
  width: 70vw;
  height: 70vh;
  background-color: tomato;
  position: fixed;
  top: calc(50% - 35vh); /* Center vertically */
  left: calc(50% - 35vw); /* Center horizontally */
  border-radius: 30px;
`;
function App() {
  const [selectedCard, setSelectedCard] = useState(false);
  const [selectedCardLayoutId, setSelectedCardLayoutId] = useState(null);
  const [widthColumn, setWidthColumn] = useState();

  const toggleClick = (layoutId) => {
    setSelectedCard((prev) => !prev);
    setSelectedCardLayoutId(layoutId); // Set the layoutId when a card is clicked
  };

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
    <Wrapper className="App">
      <Top />
      {widthColumn && (
        <Main
          toggleClick={toggleClick}
          selectedCardLayoutId={selectedCardLayoutId}
          widthColumn={widthColumn}
        />
      )}
      <Bottom />
      {selectedCard ? (
        <>
          <FocusedBackground onClick={() => toggleClick(null)} />
          <Focused layoutId={selectedCardLayoutId}></Focused>
        </>
      ) : null}
    </Wrapper>
  );
}

export default App;

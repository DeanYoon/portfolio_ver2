import { styled } from "styled-components";
import Topic from "../Topic";
import { maxWidthValue } from "../../config";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { language } from "../../atoms";
import textData from "./text";

const Wrapper = styled.div`
  background-color: #f1e6e4;
  max-width: ${maxWidthValue};
  min-width: 300px;
  width: 100%;
  height: 1000px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => props.opacity};
  transition: opacity 2s cubic-bezier(0.895, 0.03, 0.685, 0.22); //자연스러운 투명도 조절
  padding: 10%;
  padding-bottom: 5%;
  font-family: "Libre Caslon Text", serif;
  color: #433e3c;
  position: relative;
`;

const Main = styled.div`
  font-size: 150px;
  text-align: center;
  margin-bottom: 50px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)}; /* Toggle opacity */

  transition: opacity 0.5s ease-in-out, background-position 1s ease-in-out;
`;
const Bottom = styled.div`
  width: 100%;
  min-height: 200px;
  /* display: ${(props) => (props.isVisible ? "flex" : "none")}; */
  display: flex;
  opacity: ${(props) => (props.isVisible ? 1 : 0)}; /* Toggle opacity */
  transition: opacity 2s ease-in-out;
`;
const BottomLeft = styled.div`
  width: 20%;
  font-size: 30px;
`;
const BottomRight = styled.div`
  width: 80%;
  line-height: 1.5;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #888888;
`;
const AboutEng = styled(motion.div)``;
const AboutKor = styled(motion.div)``;
const LangButton = styled(motion.div)`
  margin-top: 50px;
  background-color: white;
  width: 200px;
  height: 50px;
  border-radius: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  cursor: pointer;
  opacity: ${(props) => (props.isVisible ? 1 : 0)}; /* Toggle opacity */
  transition: opacity 2s ease-in-out;
  bottom: 4%;
  position: absolute;
`;

const Kor = styled(motion.div)`
  z-index: 9;
  color: ${(props) => (props.isEng ? "#433e3c" : "white")};
  transition: all 0.5s ease;
`;
const Eng = styled(Kor)`
  color: ${(props) => (!props.isEng ? "#433e3c" : "white")};
`;
const Clicked = styled(motion.div)`
  background-color: #433e3c;
  width: 50%;
  height: 90%;
  position: absolute;
  right: 0;
  border-radius: 100px;
`;
const ClickedKor = styled(Clicked)`
  left: 0;
`;
const ClickedEng = styled(Clicked)``;

const variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

function Top() {
  const [opacity, setOpacity] = useState(0);
  const [isEng, setIsEng] = useRecoilState(language);
  const [isVisible, setIsVisible] = useState(false);

  const mainRef = useRef(null);

  useEffect(() => {
    setOpacity(1);
    // After 1 second (1000 milliseconds), set isVisible to true
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Cleanup the timeout to prevent memory leaks
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleClick = () => {
    setIsEng((prev) => !prev);
  };

  return (
    <Wrapper ref={mainRef} opacity={opacity}>
      <Main isVisible={isVisible}>Dean's Portfolio</Main>
      <Bottom isVisible={isVisible}>
        <BottomLeft>About</BottomLeft>

        <BottomRight>
          <AnimatePresence>
            {isEng ? (
              <AboutEng
                variants={variants}
                initial="initial"
                animate="visible"
                exit="initial"
              >
                {textData.about.eng}
              </AboutEng>
            ) : (
              <AboutKor
                variants={variants}
                initial="initial"
                animate="visible"
                exit="initial"
              >
                {textData.about.kor}
              </AboutKor>
            )}
          </AnimatePresence>
        </BottomRight>
      </Bottom>
      <LangButton isVisible={isVisible} onClick={handleClick}>
        <Kor isEng={isEng}>Kor</Kor>
        <Eng isEng={isEng}>Eng</Eng>
        {isEng ? (
          <ClickedEng layoutId="lang" />
        ) : (
          <ClickedKor layoutId="lang" />
        )}
      </LangButton>
    </Wrapper>
  );
}

export default Top;

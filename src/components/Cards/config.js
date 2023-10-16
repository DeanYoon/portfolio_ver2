import { motion } from "framer-motion";
import styled from "styled-components";

export const CardStyle = styled(motion.div)`
  font-size: 100px;
  width: 100%;
  min-width: 300px;
  margin-bottom: 30px;
  break-inside: avoid;
  /* opacity: ${({ isVisible }) => (isVisible ? 1 : 0)}; */
  transform: ${({ isVisible }) => {
    return !isVisible ? "rotateX(10deg)  " : "rotateX(0deg)";
  }};
  visibility: ${({ selectedCard }) => (selectedCard ? "hidden" : "")};
  height: 500px;
  transition: transform 0.5s ease-in-out;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    transition: transform 0.5s;
    transform: scale(1.03);
    box-shadow: 0px 0px 30px -10px black;
  }
`;

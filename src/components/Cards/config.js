import { motion } from "framer-motion";
import styled from "styled-components";

export const Card = styled(motion.div)`
  position: relative;
  margin-bottom: 30px;
  break-inside: avoid;
  height: 500px;
  transition: opacity 1s ease-in-out, transform 0.5s ease-in-out;
  border-radius: 30px;
  background-color: white;

  cursor: pointer;
  /* 
  &:hover {
    transition: transform 0.5s;
    transform: scale(1.03);
  } */
`;

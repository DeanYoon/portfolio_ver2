import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Card } from "./config";
import { motion, useSpring, wrap } from "framer-motion";
import useMouse from "@react-hook/mouse-position";

const Wrapper = styled(Card)`
  position: relative;
  display: flex;
  /* place-content: center;
  place-items: center; */
  overflow: hidden;
  font-size: 1500px;
`;
const Circle = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #9bf50b;
`;

function Content1() {
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0); // State to store the scrolled pixels
  const [wrapperPosition, setWrapperPosition] = useState({ left: 0, top: 0 }); // State to store wrapper position
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const constraintsRef = useRef(null);

  useEffect(() => {
    const updateCirclePosition = (e) => {
      const mouseX = e.clientX - wrapperPosition.left - 75;
      const mouseY = e.clientY - wrapperPosition.top - 75;
      setCirclePosition({ x: mouseX, y: mouseY });
    };

    const updateScrollY = () => {
      setScrollY(window.scrollY);
    };
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const rect = constraintsRef.current.getBoundingClientRect();
    setWrapperPosition({ left: rect.left, top: rect.top });

    document.addEventListener("mousemove", updateCirclePosition);
    window.addEventListener("scroll", updateScrollY);
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      document.removeEventListener("mousemove", updateCirclePosition);
      window.removeEventListener("scroll", updateScrollY);
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, [scrollY, windowWidth]);

  useEffect(() => {
    console.log(windowWidth);
  }, [windowWidth]);

  return (
    <Wrapper ref={constraintsRef}>
      <Circle
        animate={{ x: circlePosition.x, y: circlePosition.y }}
        transition={{ type: "spring", stiffness: 500, damping: 100 }} // Adjust these values for desired animation
      />{" "}
    </Wrapper>
  );
}

export default Content1;

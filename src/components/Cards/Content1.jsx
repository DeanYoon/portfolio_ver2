import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Card } from "./config";
import { motion, useSpring, wrap } from "framer-motion";
import useMouse from "@react-hook/mouse-position";

const Wrapper = styled(Card)`
  position: relative;
  overflow: hidden;
  font-size: 1500px;
`;
const Circle = styled(motion.div)`
  position: absolute;
  width: ${(props) => props.size}px; // Use the size prop to set the width
  height: ${(props) => props.size}px; // Use the size prop to set the height
  border-radius: 50%;
  background-color: #9bf50b;
`;

function Content1() {
  const circleSize = 100; // Define the size of the circle
  const halfCircle = circleSize / 2;
  const [circlePosition, setCirclePosition] = useState({
    x: halfCircle,
    y: halfCircle,
  });
  const [scrollY, setScrollY] = useState(0); // State to store the scrolled pixels
  const [wrapperPosition, setWrapperPosition] = useState({ left: 0, top: 0 }); // State to store wrapper position
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mouseEntered, setMouseEntered] = useState(false);
  const constraintsRef = useRef(null);

  const updateCirclePosition = (e) => {
    const mouseX = e.clientX - wrapperPosition.left - halfCircle;
    const mouseY = e.clientY - wrapperPosition.top - halfCircle;
    setCirclePosition({ x: mouseX, y: mouseY });
  };

  const updateScrollY = () => {
    setScrollY(window.scrollY);
  };
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const rect = constraintsRef.current.getBoundingClientRect();
    const initialX = rect.width / 2 - halfCircle;
    const initialY = rect.height / 2 - halfCircle;

    setCirclePosition({ x: initialX, y: initialY });
    setWrapperPosition({ left: rect.left, top: rect.top });
    mouseEntered &&
      document.addEventListener("mousemove", updateCirclePosition);
    window.addEventListener("scroll", updateScrollY);
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      document.removeEventListener("mousemove", updateCirclePosition);
      window.removeEventListener("scroll", updateScrollY);
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, [windowWidth, mouseEntered, scrollY]);

  const handleMouseEnter = () => {
    setMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setMouseEntered(false);
  };

  return (
    <Wrapper
      ref={constraintsRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Circle
        size={circleSize}
        animate={{ x: circlePosition.x, y: circlePosition.y }}
        transition={{ type: "spring", stiffness: 500, damping: 100 }} // Adjust these values for desired animation
      />{" "}
    </Wrapper>
  );
}

export default Content1;

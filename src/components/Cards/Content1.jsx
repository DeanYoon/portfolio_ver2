import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "./config";
import { motion, useSpring } from "framer-motion";
import useMouse from "@react-hook/mouse-position";

const Wrapper = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  position: relative;
`;
const Circle = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  /* top: 10px; */
  background-color: saddlebrown;
  border-radius: 100%;
  transition: 0.2s ease;
`;

function Content1() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [topLeft, setTopLeft] = useState({ x: 0, y: 0 }); // Store top-left coordinates

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 0,
    leaveDelay: 0,
  });

  let mouseXPosition = 0;
  let mouseYPosition = 0;

  if (mouse.x !== null) {
    mouseXPosition = mouse.clientX;
  }

  if (mouse.y !== null) {
    mouseYPosition = mouse.clientY;
  }

  const variants = {
    default: {
      opacity: 1,
      backgroundColor: "blue",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    project: {
      opacity: 1,
      backgroundColor: "red",
      left: `${mouseXPosition - topLeft.x - 100}px`,
      top: `${mouseYPosition - topLeft.y - 100}px`,
    },
  };

  const spring = {
    type: "spring",
    stiffness: 1000,
    damping: 28,
  };

  function projectEnter(event) {
    setCursorVariant("project");
  }

  function projectLeave(event) {
    setCursorVariant("default");
  }

  // Calculate top-left coordinates when mouse position changes

  const getTopLeftCor = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setTopLeft({ x: rect.left, y: rect.top });
    }
  };

  useEffect(() => {
    getTopLeftCor();
  }, []);

  useEffect(() => {
    console.log(mouseXPosition, mouseYPosition);
  }, [mouseXPosition]);

  useEffect(() => {
    console.log(topLeft);
  }, [topLeft]);

  useEffect(() => {
    const handleResize = () => {
      getTopLeftCor();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={ref}>
      <Wrapper onMouseEnter={projectEnter} onMouseLeave={projectLeave}>
        <Circle
          variants={variants}
          animate={cursorVariant}
          transition={spring}
        />
      </Wrapper>
    </div>
  );
}

export default Content1;

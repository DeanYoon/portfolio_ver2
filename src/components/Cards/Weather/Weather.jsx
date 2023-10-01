import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Card } from "../config";
import { motion } from "framer-motion";
import axios from "axios";
import { getCoordinate, getLocation, getWeather } from "./WeatherData";

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
const geoApiKey = process.env.REACT_APP_LOCATION_API_KEY;
const Wrapper = styled(motion.div)`
  position: relative;
  height: 500px;
  transition: opacity 1s ease-in-out, transform 0.5s ease-in-out,
    background-color 1s ease-in-out;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-size: 30px;
  background-color: ${(props) => (props.isMouseEnter ? "#6d7279" : "#515151")};
  color: white;
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: ${(props) => props.size}px; // Use the size prop to set the width
  height: ${(props) => props.size}px; // Use the size prop to set the height
  border-radius: 50%;
  background-color: ${(props) => (!props.isMouseEnter ? "#838a93" : "#515151")};
  filter: blur(30px);
  transition: background-color 0.5s ease-out;
`;

const WeatherInfo = styled.div`
  z-index: 1;
  text-align: center;
`;
const WeatherIcon = styled.img``;
const Location = styled.div``;
const WeatherDetail = styled.div``;

function Weather() {
  const circleSize = 200; // Define the size of the circle
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

  const [fetchedData, setFetchedData] = useState({
    country: "",
    state: "",
    weatherObj: {},
    temp: "",
  });

  const updateCirclePosition = (e) => {
    const mouseX = e.clientX - wrapperPosition.left - circleSize;
    const mouseY = e.clientY - wrapperPosition.top - circleSize;
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
    const initialX = rect.width / 2 - circleSize;
    const initialY = rect.height / 2 - circleSize;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { weatherObj, temp } = await getWeather(weatherApiKey);
        const { country, state } = await getLocation(geoApiKey);
        setFetchedData({
          country,
          state,
          weatherObj,
          temp,
        });
        // Use the fetched data as needed
      } catch (error) {
        // Handle any errors that occur during the asynchronous operations
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

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
      isMouseEnter={mouseEntered}
    >
      <Circle
        size={circleSize}
        animate={{ x: circlePosition.x, y: circlePosition.y }}
        transition={{ type: "spring", stiffness: 500, damping: 100 }} // Adjust these values for desired animation
        isMouseEnter={mouseEntered}
      />
      <WeatherInfo>
        {fetchedData.weatherObj.icon && (
          <WeatherIcon
            src={`https://openweathermap.org/img/wn/${fetchedData.weatherObj.icon}@2x.png`}
          />
        )}
        <Location>{fetchedData.country}</Location>
        <Location>{fetchedData.state}</Location>
        <WeatherDetail>{fetchedData.weatherObj.main}</WeatherDetail>
        <WeatherDetail>{fetchedData.temp}</WeatherDetail>
      </WeatherInfo>
    </Wrapper>
  );
}

export default Weather;

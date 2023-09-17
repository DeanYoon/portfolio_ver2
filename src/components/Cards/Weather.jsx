import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Card } from "./config";
import { motion } from "framer-motion";
import axios from "axios";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const Wrapper = styled(motion.div)`
  position: relative;
  height: 500px;
  transition: opacity 1s ease-in-out, transform 0.5s ease-in-out;
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
  &:hover {
    transition: all 0.3s ease-in-out;
  }
`;
const WeatherInfo = styled.div`
  z-index: 999;
  text-align: center;
`;
const WeatherIcon = styled.img``;
const Location = styled.div``;
const WeatherDetail = styled.div``;

const Circle = styled(motion.div)`
  position: absolute;
  width: ${(props) => props.size}px; // Use the size prop to set the width
  height: ${(props) => props.size}px; // Use the size prop to set the height
  border-radius: 50%;
  background-color: ${(props) => (!props.isMouseEnter ? "#838a93" : "#515151")};
  filter: blur(70px);
`;

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
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherObj, setWeatherObj] = useState({});
  const [temp, setTemp] = useState();
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
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      // Use lat and lon to make your API request
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        )
        .then((response) => {
          setWeatherObj(response.data.weather[0]);
          setTemp(`${Math.floor(response.data.main.temp - 273.15)}'C`);
          // You can update the WeatherInfo, WeatherIcon, Location, and Weather state here
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [lat, lon]);

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
        {weatherObj.icon && (
          <WeatherIcon
            src={`https://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`}
          />
        )}
        <Location>Korea, Seoul</Location>
        <WeatherDetail>{weatherObj.main}</WeatherDetail>
        <WeatherDetail>{temp}</WeatherDetail>
      </WeatherInfo>
    </Wrapper>
  );
}

export default Weather;

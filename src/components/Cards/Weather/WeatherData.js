import axios from "axios";

export const getCoordinate = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => reject(error)
      );
    } else {
      reject(new Error("Geolocation is not available"));
    }
  });
};

export const getWeather = async (weatherApiKey) => {
  try {
    const { latitude, longitude } = await getCoordinate();
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`
    );
    const weatherData = response.data;

    // Process the weather data as needed
    const weatherObj = weatherData.weather[0];
    const temp = `${Math.floor(weatherData.main.temp - 273.15)}°C`;
    return { weatherObj, temp };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getLocation = async (geoApiKey) => {
  try {
    const { latitude, longitude } = await getCoordinate();
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApiKey}`
    );
    const result = response.data.results[0];
    const country = result.country;
    const state = result.state;
    return { country, state };
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};

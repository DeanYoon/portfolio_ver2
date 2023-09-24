import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAccessToken } from "../../utils/spotify/token";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

function GPT() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // Check if an access token and its expiration time are stored in local storage
    const storedToken = localStorage.getItem("spotifyAccessToken");
    const storedExpiration = localStorage.getItem(
      "spotifyAccessTokenExpiration"
    );

    if (storedToken && storedExpiration) {
      const expirationTime = parseInt(storedExpiration, 10); //String in to Integer
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (currentTime < expirationTime) {
        // Token is still valid, use it
        setAccessToken(storedToken);
        return;
      }
    }

    // If no token is stored or it's expired, request a new one
    const token = getAccessToken(); // Initial token retrieval
    setAccessToken(token);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "https://api.spotify.com/v1/me",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.request(config);
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    accessToken && fetchData();
  }, [accessToken]);

  return <Wrapper></Wrapper>;
}

export default GPT;

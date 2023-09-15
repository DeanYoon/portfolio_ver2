import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENTID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_SECRET;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

function Music() {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        // Handle the response here
        setAccessToken(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <span>hi</span>
    </Wrapper>
  );
}

export default Music;

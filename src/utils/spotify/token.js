import axios from "axios";

export const getAccessToken = async () => {
  const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENTID;
  const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_SECRET;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",

      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: SPOTIFY_CLIENT_ID,
          password: SPOTIFY_CLIENT_SECRET,
        },
      }
    );

    const token = response.data.access_token;
    const expiresIn = response.data.expires_in;

    const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;

    localStorage.setItem("spotifyAccessToken", token);
    localStorage.setItem("spotifyAccessTokenExpiration", expirationTime);

    return token;
  } catch (error) {
    console.error("Error obtaining access token:", error);
    return null;
  }
};

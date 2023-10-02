export const searchVideos = async (query) => {
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${apiKey}`
  );
  const data = await response.json();
  console.log(data);
  const videoId = data.items[0].id.videoId;
  return videoId;
};

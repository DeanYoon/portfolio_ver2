import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { language } from "../../atoms";

const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  padding: 30px;
`;
const NewsImage = styled.img`
  border-radius: 20px;
  width: 100%;
  max-height: 80%;
`;
const Title = styled.div`
  text-align: center;
  font-size: 30px;
  padding-top: 20px;
`;
const ErrorMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: red;
  padding-top: 20px;
`;

const apiKey = process.env.REACT_APP_NEWS_API_KEY;

function News() {
  const [newsList, setNewsList] = useState([]);
  const [news, setNews] = useState({});
  const [error, setError] = useState(null);
  const isEng = useRecoilValue(language);
  let truncatedTitle = "";
  const getNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${
          isEng ? "us" : "kr"
        }&apiKey=${apiKey}`
      );

      if (response.data.articles) {
        const filteredNewsList = response.data.articles.filter(
          (article) => article.urlToImage
        );
        setNewsList(filteredNewsList);
        setError(null);
      } else {
        setError("Error fetching news data.");
      }
    } catch (error) {
      setError("Error fetching news data.");
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, [isEng]);

  useEffect(() => {
    newsList && setNews(newsList[Math.floor(Math.random() * newsList.length)]);
  }, [newsList]);

  if (news) {
    truncatedTitle =
      news.title && news.title.length > 70
        ? news.title.slice(0, 70) + "..."
        : news.title;
  }
  return (
    <>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        news && (
          <Wrapper href={news.url ? news.url : "#"} target="_blank">
            <NewsImage src={news.urlToImage ? news.urlToImage : ""} />
            <Title>{news.title ? truncatedTitle : ""}</Title>
          </Wrapper>
        )
      )}
    </>
  );
}

export default News;

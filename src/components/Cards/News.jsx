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

const apiKey = process.env.REACT_APP_NEWS_API_KEY;

function News() {
  const [newsList, setNewsList] = useState([]);
  const [news, setNews] = useState({});
  const isEng = useRecoilValue(language);
  const getNews = async () => {
    await axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${
          isEng ? "us" : "kr"
        }&apiKey=${apiKey}`
      )
      .then((response) => {
        const filteredNewsList = response.data.articles.filter(
          (article) => article.urlToImage
        );
        setNewsList(filteredNewsList);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getNews();
  }, [isEng]);
  useEffect(() => {
    setNews(newsList[Math.floor(Math.random() * newsList.length)]);
  }, [newsList]);
  const truncatedTitle =
    news.title && news.title.length > 70
      ? news.title.slice(0, 70) + "..."
      : news.title;
  return (
    <>
      {news && (
        <Wrapper href={news.url ? news.url : "#"} target="_blank">
          <NewsImage src={news.urlToImage ? news.urlToImage : ""} />
          <Title>{news.title ? truncatedTitle : ""}</Title>
        </Wrapper>
      )}
    </>
  );
}

export default News;

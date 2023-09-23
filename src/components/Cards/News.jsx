import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
  const getNews = async () => {
    await axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
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
  }, []);
  useEffect(() => {
    setNews(newsList[Math.floor(Math.random() * newsList.length)]);
  }, [newsList]);

  return (
    <>
      {news && (
        <Wrapper href={news.url ? news.url : "#"} target="_blank">
          <NewsImage src={news.urlToImage ? news.urlToImage : ""} />
          <Title>{news.title ? news.title : ""}</Title>
        </Wrapper>
      )}
    </>
  );
}

export default News;
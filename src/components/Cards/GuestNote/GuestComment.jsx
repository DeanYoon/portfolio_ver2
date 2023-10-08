// CommentText.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const CommentTextWrapper = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: white;
  position: relative;
  &:hover {
    background-color: #00000022;
    transition: background-color 0.3s ease-in-out;
    border-radius: 10px;
  }
`;

const User = styled.span``;
const Text = styled.span`
  width: 90%;
`;
const Time = styled.span`
  font-size: 20px;
`;

const DeleteForm = styled.form`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  input,
  button {
    z-index: 5;
  }
`;

const DeleteFormBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.287);
  border-radius: 10px;
`;
const DeleteIcon = styled.div`
  position: absolute;
  left: calc(50%);
  font-size: 40px;
  color: red;
`;
function CommentText({ comment, index, setDeletedIndex }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    if (diff < 1000 * 60) {
      return `${Math.floor(diff / 1000)}s`;
    } else if (diff < 1000 * 60 * 60) {
      return `${Math.floor(diff / (1000 * 60))}m`;
    } else if (diff < 1000 * 60 * 60 * 24) {
      return `${Math.floor(diff / (1000 * 60 * 60))}h`;
    } else if (diff < 1000 * 60 * 60 * 24 * 30) {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24))}d`;
    } else {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const formattedDate = new Date(date).toLocaleDateString("ko-KR", options);
      return formattedDate;
    }
  };
  const handleClick = () => {
    setDeleteClicked(true);
  };
  const handleDeleteFormBackgroundClick = () => {
    setDeleteClicked(false);
  };
  const checkPassword = async (data) => {
    const deleteData = {
      password: data.password,
      text: comment.text,
    };
    try {
      const response = await axios.post(`${API_URL}/delete/`, deleteData);
      setDeletedIndex(index);
      setDeleteClicked(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setDeleteClicked(false);
    }
  };
  return (
    <CommentTextWrapper
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave(index)}
    >
      <Text>{comment.text}</Text>
      <Time>{formatTimeAgo(new Date(comment.time))}</Time>
      {hoveredIndex === index && (
        <DeleteIcon onClick={() => handleClick(index)}>x</DeleteIcon>
      )}
      {deleteClicked && (
        <DeleteForm onSubmit={handleSubmit(checkPassword)}>
          <DeleteFormBackground onClick={handleDeleteFormBackgroundClick} />

          <input
            {...register("password")}
            type="password"
            minlength="4"
            maxLength="4"
            placeholder="password"
            required
          />
          <button>submit</button>
        </DeleteForm>
      )}
    </CommentTextWrapper>
  );
}

export default CommentText;

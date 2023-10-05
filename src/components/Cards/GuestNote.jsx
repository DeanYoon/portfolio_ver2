import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form } from "./Prompt";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
const requestIp = require("request-ip");

// import formatTimeAgo from "../../utils/dateUtils";

const Wrapper = styled.div`
  font-size: 30px;
  height: 100%; /* Adjust the maximum height as needed */
`;

const CommentWrapper = styled.div`
  padding: 0 30px;
  max-height: 80%;
  overflow-y: auto;
`;
const CommentText = styled.li`
  list-style-type: none; /* Remove the bullet point */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const User = styled.span``;
const Text = styled.span``;
const Time = styled.span`
  font-size: 20px;
`;
function GuestNote() {
  const { register, handleSubmit, reset } = useForm();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [insertedComment, setInsertedComment] = useState();
  const commentWrapperRef = useRef(null);
  // Function to fetch comments from the server
  const getComments = async () => {
    try {
      const response = await axios.get("http://localhost:4000/");
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Function to post a comment to the server
  const postComment = async () => {
    if (comment) {
      const data = {
        ip: "127.0.1.2",
        text: comment,
      };
      try {
        const response = await axios.post("http://localhost:4000/", data);
        setComments([...comments, response.data]);
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  // Fetch comments from the server when the component mounts
  useEffect(() => {
    getComments();
  }, []);

  // Post a comment when 'comment' state changes
  useEffect(() => {
    postComment();
  }, [comment]);

  useEffect(() => {
    if (commentWrapperRef.current) {
      commentWrapperRef.current.scrollTop =
        commentWrapperRef.current.scrollHeight;
    }
  }, [comments]);
  // Handler for form submission
  const saveText = (data) => {
    setComment(data.comment);
    reset();
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

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(saveText)}>
        <input
          {...register("comment")}
          placeholder="Leave comment or feedback"
          required
        />
      </Form>

      <CommentWrapper ref={commentWrapperRef}>
        {comments?.map((comment, index) => (
          <CommentText key={index}>
            <Text>{comment.text}</Text>
            <Time>{formatTimeAgo(new Date(comment.time))}</Time>
          </CommentText>
        ))}
      </CommentWrapper>
    </Wrapper>
  );
}

export default GuestNote;

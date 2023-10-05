import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CommentText from "./GuestComment";

const Wrapper = styled.div`
  font-size: 20px;
  height: 100%; /* Adjust the maximum height as needed */
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    font-size: 30px;
    border-radius: 30px;
    outline: none;
    border: none;
    font-size: 20px;
  }
`;
const SubmitWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  input {
    width: 40%;
  }
  button {
    width: 40%;
    border-radius: 100px;
    border: none;
    font-size: 20px;
    cursor: pointer;
    background-color: #d8d8d8;
    &:hover {
      background-color: #00000054;
      transition: all 0.3s ease-in-out;
    }
  }
`;

const CommentWrapper = styled.div`
  padding: 0 30px;
  max-height: 70%;
  overflow-y: auto;
`;

function GuestNote() {
  const { register, handleSubmit, reset } = useForm();
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [deletedIndex, setDeletedIndex] = useState();
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
        password: comment.password,
        text: comment.text,
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
  }, [deletedIndex]);

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
    setComment(data);
    reset();
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(saveText)}>
        <input
          {...register("text")}
          placeholder="comment or feedback"
          required
        />
        <SubmitWrapper>
          <input
            {...register("password")}
            type="password"
            minlength="4"
            maxLength="4"
            placeholder="password"
            required
          />
          <button>submit</button>
        </SubmitWrapper>
      </Form>

      <CommentWrapper ref={commentWrapperRef}>
        {comments?.map((comment, index) => (
          <CommentText
            key={index}
            index={index}
            comment={comment}
            setDeletedIndex={setDeletedIndex}
          />
        ))}
      </CommentWrapper>
    </Wrapper>
  );
}

export default GuestNote;

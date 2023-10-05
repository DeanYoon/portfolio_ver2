import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form } from "./Prompt";
import { useEffect, useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
  font-size: 30px;
`;

const CommentWrapper = styled.ul``;
const CommentText = styled.li``;
function GuestNote() {
  const { register, handleSubmit, reset } = useForm();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [insertedComment, setInsertedComment] = useState();
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

  // Handler for form submission
  const saveText = (data) => {
    setComment(data.comment);
    reset();
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(saveText)}>
        <input
          {...register("comment")}
          placeholder="Leave comment of feedback"
          required
        />
      </Form>

      <CommentWrapper>
        {comments.map((comment, index) => (
          <CommentText key={index}>{comment.text}</CommentText>
        ))}
      </CommentWrapper>
    </Wrapper>
  );
}

export default GuestNote;

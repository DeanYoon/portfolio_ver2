import styled from "styled-components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { promptInput } from "../../atoms";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: inherit;
`;
const Form = styled.form`
  display: flex;
  padding: 30px;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 50px;
    font-size: 30px;
    border-radius: 30px;
    outline: none;
  }
`;
const Button = styled.button`
  position: absolute;
  right: 40px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
`;

function Prompt() {
  const { register, handleSubmit, reset } = useForm();
  const setPrompt = useSetRecoilState(promptInput);
  const saveText = (data) => {
    setPrompt(data.prompt);
    reset();
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(saveText)}>
        <input {...register("prompt")} placeholder="Tell me your mood" />
        <Button>
          <KeyboardArrowUpIcon fontSize="large" />
        </Button>
      </Form>
    </Wrapper>
  );
}

export default Prompt;

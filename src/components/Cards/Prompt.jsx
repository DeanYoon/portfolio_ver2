import styled from "styled-components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { promptInput } from "../../atoms";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #c7beba;
  border-radius: inherit;
`;
const Title = styled.div`
  font-size: 30px;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const InputWrapper = styled.div`
  font-size: 1px;
  position: relative;
  margin-top: 20px;
  input {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 50px;
    font-size: 30px;
    border-radius: 30px;
    outline: none;
    border: none;
  }
`;

const Button = styled.button`
  position: absolute;
  padding: 0;
  right: 10px;
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
        <Title>Music Recommender</Title>
        <InputWrapper>
          <input {...register("prompt")} placeholder="Tell me your mood" />
          <Button>
            <KeyboardArrowUpIcon fontSize="large" />
          </Button>
        </InputWrapper>
      </Form>
    </Wrapper>
  );
}

export default Prompt;

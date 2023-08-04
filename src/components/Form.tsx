import { useFormContext } from 'react-hook-form'
import React from 'react'
import styled from 'styled-components'

type PropsType = {
  name: string
}

export const TextInputContainer: React.FC<PropsType> = ({ name }) => {
  const { register } = useFormContext();
  return <Input type="text" {...register(name)} />;
};

export const TextAreaItem: React.FC<PropsType> = ({ name }) => {
  const { register } = useFormContext();
  return <TextArea {...register(name)} />;
};

export const SubmitButtonContainer: React.FC<PropsType> = ({ name }) => {
  return <SubmitButton>{name}</SubmitButton>;
}

const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 100%;
  height: 120px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

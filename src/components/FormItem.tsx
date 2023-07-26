import { UseFormRegisterReturn } from 'react-hook-form'
import React from 'react'
import styled from 'styled-components'

type PropsType = {
  labelName: string
  register: UseFormRegisterReturn
  disabled: string
}


type ButtonPropsType = {
  disabled: boolean;
};


const TextInput: React.VFC = (props: PropsType) => {
  const { id, labelName, register } = props;

  return (
    <>
      <label htmlFor={id}>{labelName}</label>
      <Input id={id} type="text" {...register} />
    </>
  )
}

export const Textarea: React.VFC = (props: PropsType) => {
  const { id, labelName, register } = props

  return (
    <>
      <label htmlFor={id}>{labelName}</label>
      <textarea id={id} {...register} />
    </>
  )
}

export const SelectBox: React.VFC = (props: PropsType) => {
  const { id, labelName, register } = props

  return (
    <>
      <label htmlFor={id}>{labelName}</label>
      <select id={id} {...register}>
        <option>選択肢1</option>
        <option>選択肢2</option>
      </select>
    </>
  )
}

export const SubmitButton: React.FC<ButtonPropsType> = ({ disabled }) => {
  return (
    <>
    <Button disabled={disabled}>投稿する</Button>
    </>
  )
}


const Button = styled.button`
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

export default TextInput;

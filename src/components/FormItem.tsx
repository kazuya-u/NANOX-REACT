import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type PropsType = {
  labelName: string
  register: UseFormRegisterReturn
}

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

export const SubmitButton: React.VFC = () => {
  return (
    <input type="submit" />
  )
}

export default TextInput;
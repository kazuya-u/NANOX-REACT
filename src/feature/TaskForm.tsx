import { Path, useForm, UseFormRegister } from "react-hook-form";
import axios from 'axios';
import styled from "styled-components";
interface IFormValues {
  firstName: string;
  lastName: string;
  age: number;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};

const TaskForm = () => {
  const endpoint = 'https:/drupal.sandbox.dev.lando/jsonapi/node/task';
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const onsubmit = async (data) => {
    const nodeData = {
      "data": {
        "type": "node--task",
        "attributes": {
          "title": data.title,
          "field_description": data.description
        },
      }
    }
    console.log(nodeData);
    try {
      const response = await axios.post(endpoint, nodeData, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        },
      });
      console.log('Nodeが投稿されました。', response.data);
    } catch (error) {
      console.error('Nodeの投稿に失敗しました。', error);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onsubmit)}>
        <Heading>Taskの追加</Heading>
        <Input type="text" {...register('title')} placeholder="Title..." />
        <Textarea {...register('description')} placeholder="This is a ..." />
        <SubmitButton disabled={!isDirty || !isValid}>投稿する</SubmitButton>
      </Form>
    </>
  );

};


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
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
export default TaskForm;
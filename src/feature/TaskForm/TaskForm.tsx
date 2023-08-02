import { TextAreaItem, TextInputContainer } from "../../components/Form";
import { toast } from "react-toastify";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";

const TaskForm = () => {
  const methods = useForm();
  const onSubmit = async (data) => {
    const endpoint = 'https:/drupal.sandbox.dev.lando/jsonapi/node/task';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json',
        },
        body: JSON.stringify({
          "data": {
            "type": "node--task",
            "attributes": {
              "title": data.title,
              "field_description": data.description,
            },
            "relationships": {
              "uid": {
                "data": {
                  "type": "user--user",
                  "id": "570dfaca-8e38-4849-bb20-679c05c2488e"
                }
              }
            }
          },
        }
        ),
      });
      const post = await res.json();
      console.log('Nodeが投稿されました。', res.body);
      toast.done('タスクを追加しました。');
      return { post };
    } catch {
      console.error('タスクを追加できませんでした。');
    }
  }
  
  return (
    <>
    <FormProvider {...methods} >
      <FormWrapper method="post" onSubmit={methods.handleSubmit(onSubmit)}>
        <Heading>Add Task</Heading>
        <TextInputContainer name="title" />
        <TextAreaItem name="description" />
        <SubmitButton>投稿する</SubmitButton>
      </FormWrapper>
    </FormProvider>
    </>
  );

};


const FormWrapper = styled.form`
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
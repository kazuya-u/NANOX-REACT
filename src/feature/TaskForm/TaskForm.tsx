import { SubmitButtonContainer, TextAreaItem, TextInputContainer } from "../../components/Form";
import { toast } from "react-toastify";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";

type FormData = {
  title: string;
  description: string;
};

const TaskForm = () => {
  const methods = useForm();
  const onSubmit = async (data: FormData) => {
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
      toast.success('Nodeが投稿されました。');
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
        <SubmitButtonContainer name="投稿する" />
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

export default TaskForm;

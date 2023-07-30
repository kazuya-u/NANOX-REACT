import { ActionFunction, Form, LoaderFunction, useLoaderData } from "react-router-dom";
import styled from "styled-components";

const baseURL = "https://drupal.sandbox.dev.lando/jsonapi/node/task/";

type LoaderData = {
  task: {
    data: {
      attributes: {
        title: string;
        field_description: string;
        created: string;
      }
    }
  };
}

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`${baseURL}${params.taskId}`);
  if (!res.ok) {
    throw Error('Not Found');
  }
  const task = await res.json();
  return { task };
}

export const action: ActionFunction = async ({ request, params }) => {
  const data = Object.fromEntries(await request.formData());

  const res = await fetch(`${baseURL}${params.taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    },
    body: JSON.stringify({
      "data": {
        "type": "node--task",
        "id": params.taskId,
        "attributes": {
          "title": data.title,
          "field_description": data.description,
        },
      },
    }
    ),
  });
  const task = await res.json();
  return { task };
}

const Task: React.FC = () => {
  const { task } = useLoaderData() as LoaderData;
  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FormWrapper method="post">
        <Input name="title" placeholder="title" />
        <br />
        <Textarea name="description" id=""></Textarea>
        <br />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormWrapper>
      <h2>{task.data.attributes.title}</h2>
      <div>
        <p>内容:{task.data.attributes.field_description}</p>
        <p>作成日：{task.data.attributes.created}</p>
      </div>
    </>
  );
};

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 0 auto;
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

export default Task;

import { ActionFunction, Form, LoaderFunction, useLoaderData } from "react-router-dom";
import styled from "styled-components";

const baseURL = "https://drupal.sandbox.dev.lando/jsonapi/node/task/";

type LoaderData = {
  post: {
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
  const res = await fetch(`${baseURL}${params.postId}`);
  if (!res.ok) {
    throw Error('Not Found');
  }
  const post = await res.json();
  return { post };
}

export const action: ActionFunction = async ({ request, params }) => {
  const data = Object.fromEntries(await request.formData());

  const res = await fetch(`${baseURL}${params.postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    },
    body: JSON.stringify({
      "data": {
        "type": "node--task",
        "id": params.postId,
        "attributes": {
          "title": data.title,
          "field_description": data.description,
        },
      },
    }
    ),
  });
  const post = await res.json();
  return { post };
}

const Post: React.FC = () => {
  const { post } = useLoaderData() as LoaderData;
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Form method="post">
        <Input name="title" placeholder="title" />
        <br />
        <Textarea name="description" id=""></Textarea>
        <br />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
      <h2>{post.data.attributes.title}</h2>
      <div>
        <p>内容:{post.data.attributes.field_description}</p>
        <p>作成日：{post.data.attributes.created}</p>
      </div>
    </>
  );
};


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

export default Post;

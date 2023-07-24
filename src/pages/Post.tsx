import { ActionFunction, Form, LoaderFunction, useLoaderData } from "react-router-dom";

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
        <input name="title" placeholder="title" />
        <br />
        <textarea name="description" id="" cols="30" rows="10"></textarea>
        <br />
        <button type="submit">Submit</button>
      </Form>
      <h2>{post.data.attributes.title}</h2>
      <div>
        <p>内容:{post.data.attributes.field_description}</p>
        <p>作成日：{post.data.attributes.created}</p>
      </div>
    </>
  );
};

export default Post;

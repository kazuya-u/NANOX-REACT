import { LoaderFunction, useLoaderData } from "react-router-dom";

const baseURL = "https://drupal.sandbox.dev.lando/jsonapi/node/task/";

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`${baseURL}${params.postId}`);
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  const post = await res.json();
  console.log(post);
  return { post };
}

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

const Post: React.FC = () => {
  const { post } = useLoaderData() as LoaderData;
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>{post.data.attributes.title}</h2>
      <div>
        <p>本文:{post.data.attributes.field_description}</p>
        {/* <p>プロジェクト:{post.data.attributes.title}</p> */}
        <p>作成日：{post.data.attributes.created}</p>
      </div>
    </>
  );
};

export default Post;

import { useLoaderData } from "react-router-dom";

const baseURL = "https://drupal.sandbox.dev.lando/node/";
const baseQueryParam = "?_format=json";

export async function loader({ params }) {
  const res = await fetch(`${baseURL}${params.postId}${baseQueryParam}`);
  if (res.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  const post = await res.json();
  console.log(post);
  return { post };
}

const Post: React.FC = () => {
  const { post } = useLoaderData();
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>{post.title[0].value}</h2>
      <div>
        <p>プロジェクト:{post.nid[0].value}</p>
        <p>nodeID:{post.nid[0].value}</p>
      </div>
    </>
  );
};

export default Post;

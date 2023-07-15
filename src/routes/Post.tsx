import { useLoaderData } from 'react-router-dom';

const baseURL = "https://drupal.sandbox.dev.lando/node/";
const baseQueryParam = "?_format=json";

export async function loader({ params }) {
  const res = await fetch(
    `${baseURL}${params.postId}${baseQueryParam}`
  );
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
      <h2>Single Post</h2>
      <div>
        <p>ID:{post.nid[0].value}</p>
        <p>タイトル:{post.title[0].value}</p>
      </div>
    </>
  );
};

export default Post;


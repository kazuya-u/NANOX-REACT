import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const post = await res.json();
  
  if (!res.ok) {
    throw Error('Not Found!!');
  }
  
  return { post };
}

const Post: React.FC = () => {
  const { post } = useLoaderData();
  return (
    <>
      <h2>Single Post</h2>
      <div>
        <p>ID:{post.id}</p>
        <p>タイトル:{post.title}</p>
        <p>内容:{post.body}</p>
      </div>
    </>
  );
}

export default Post;
import { Link, useLoaderData } from 'react-router-dom';

export async function loader() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await res.json();
  return { posts };
}

const PostIndex: React.FC = () => {
  const { posts } = useLoaderData();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.id}:{post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostIndex;

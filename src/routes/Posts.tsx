import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Posts: React.FC = () => {
  const [post, setPost] = useState([]);
  
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, []);
  
  return (
    <>
      <h2>記事一覧</h2>
      <ul>
        {post.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              {post.id}:{post.title}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
};

export default Posts;

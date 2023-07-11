import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostIndex: React.FC = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, []);

  return (
    <>
      <ul>
        {post.map((post) => (
          <li key={post.id}>
            <Link to={`${post.id}`}>
              {post.id}:{post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostIndex;

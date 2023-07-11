import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stringifier } from "styled-components/dist/types";

const Post: React.FC = () => {
  type Data = {
    id: number,
    title: string,
    body: string,
  }
  const { postId } = useParams();
  const [post, setPost] = useState<Data[]>([]);
  
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [postId]);
  
  return (
    <>
    <h2>Single Post { postId } </h2>
    <div>
      <p>
        ID: {post.id}
      </p>
      <p>
        タイトル: {post.title}
      </p>
      <p>
        内容: {post.body}
      </p>
    </div>
    </>
  )
};

export default Post
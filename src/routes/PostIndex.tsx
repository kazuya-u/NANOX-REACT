import { Link, useLoaderData } from "react-router-dom";

const baseURL = "https://drupal.sandbox.dev.lando/task";
const baseQueryParam = "?_format=json";

export async function loader() {
  const res = await fetch(
    `${baseURL}${baseQueryParam}`
  );
  const posts = await res.json();
  
  return { posts };
}

const PostIndex: React.FC = () => {
  const { posts } = useLoaderData();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.nid[0].value}>
          <Link to={`/posts/${post.nid[0].value}`}>
          {post.title[0].value}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostIndex;

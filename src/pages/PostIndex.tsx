import { Link, LoaderFunction, useLoaderData } from "react-router-dom";

const baseURL = "https://drupal.sandbox.dev.lando/test_rest";
// const baseURL = "https://drupal.sandbox.dev.lando/task";

export const loader: LoaderFunction = async () => {
  const res = await fetch(baseURL);
  const posts = await res.json();
  console.log(posts);
  return { posts };
}

const PostIndex: React.FC = () => {
  const { posts } = useLoaderData();

  return (
    <>
    <div>
      <Link to={'/addtask'}>
        Taskの追加
      </Link>
    </div>
    <ul>
      {posts.map((post) => (
        <li key={post.nid}>
          <Link to={`/posts/${post.nid}`}>
          Project:{post.name}
          <br />
          {post.title}
          </Link>
        </li>
      ))}
    </ul>
    
    </>
  );
};

export default PostIndex;

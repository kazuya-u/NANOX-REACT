import { Link, useLoaderData } from "react-router-dom";

const baseURL = "https://drupal.sandbox.dev.lando/test_rest";
// const baseURL = "https://drupal.sandbox.dev.lando/task";
const baseQueryParam = "?_format=json";

export async function loader() {
  const res = await fetch(
    `${baseURL}${baseQueryParam}`
  );
  const posts = await res.json();
  console.log(posts);
  
  return { posts };
}

const PostIndex: React.FC = () => {
  const { posts } = useLoaderData();

  return (
    <>
    <div>
      <Link to={'/add-task'}>
        Taskの追加
      </Link>
    </div>
    <ul>
      {posts.map((post) => (
        // <li key={post.nid[0].value}>
        //   <Link to={`/posts/${post.nid[0].value}`}>
        //   {post.title[0].value}
        //   {/* {post.} */}
        //   </Link>
        // </li>
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

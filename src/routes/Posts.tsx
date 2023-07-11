import { Outlet } from "react-router-dom";

const Posts: React.FC = () => {
  
  return (
    <>
      <h2>記事一覧</h2>
      <Outlet />
    </>
  );
};

export default Posts;

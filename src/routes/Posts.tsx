import { Outlet } from 'react-router-dom';

const Posts: React.FC = () => {
  return (
    <>
      <h2>Posts</h2>
      <Outlet />
    </>
  );
}

export default Posts;
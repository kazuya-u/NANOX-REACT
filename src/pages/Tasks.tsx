import { Outlet } from 'react-router-dom';

const Tasks: React.FC = () => {
  return (
    <>
      <h2>Tasks</h2>
      <Outlet />
    </>
  );
}

export default Tasks;

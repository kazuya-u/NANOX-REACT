import { Outlet } from 'react-router-dom';

const TaskLayout: React.FC = () => {
  return (
    <>
      <h2>Tasks</h2>
      <Outlet />
    </>
  );
}

export default TaskLayout;

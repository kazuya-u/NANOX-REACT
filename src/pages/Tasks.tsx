import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

const Tasks: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Oval />
        </>
      ) : (
        <>
          <h2>Tasks</h2>
          <Outlet />
        </>
      )}
    </>
  );
}

export default Tasks;

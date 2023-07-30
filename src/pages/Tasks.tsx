import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

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
        <p className="loader">Loading...</p>
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

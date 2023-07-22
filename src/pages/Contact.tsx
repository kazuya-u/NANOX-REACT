import { useLocation } from "react-router-dom";

const Contact: React.FC = () => {
  const location = useLocation();
  console.log(location);
  
  
  return (
    <>
      <h2>Contact</h2>
    </>
  );
}

export default Contact
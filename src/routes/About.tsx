import { useNavigate } from "react-router-dom";

const About: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <h2>About</h2>
      <button onClick={() => navigate('/contact?key=umeki', { state: 'test'})}>Contactへ</button>
    </>
  );
}

export default About;
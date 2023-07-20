import { useNavigate } from "react-router-dom";
import ReactEditor from "../components/Editor";

const About: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <h2>About</h2>
      <button onClick={() => navigate('/contact?key=umeki', { state: 'test'})}>Contactへ</button>
      <ReactEditor />
    </>
  );
}

export default About;
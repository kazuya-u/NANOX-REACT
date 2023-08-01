import { useContext } from "react";
import { ContextType, Context } from "../../feature/context/useContext";

const ComponentC = () => {
  
  const description: ContextType = useContext(Context);
  
  return (
    <h3>{description}</h3>
  );
};

export default ComponentC;

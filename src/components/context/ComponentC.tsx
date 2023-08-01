import { useContext } from "react";
import { Context } from "../../pages/Context";

const ComponentC = () => {
  
  const description = useContext(Context);
  
  return (
    <h3>{description}</h3>
  );
};

export default ComponentC;

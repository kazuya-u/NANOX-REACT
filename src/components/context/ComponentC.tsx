import { useContext } from "react";
import { UserCount } from "../../pages/Context";

const ComponentC = () => {
  const count = useContext(UserCount);
  return (
    <div>
      <p>Componet C</p>
      <p>{count}</p>
    </div>
  );
};

export default ComponentC;

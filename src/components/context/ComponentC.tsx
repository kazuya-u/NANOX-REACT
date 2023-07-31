import { UserCount } from "../../pages/Context";

const ComponentC = () => {
  return (
    <UserCount.Consumer>
      {(count) => {
        return <p>{count}</p>
      }}
    </UserCount.Consumer>
  );
};

export default ComponentC;

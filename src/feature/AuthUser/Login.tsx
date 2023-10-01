import { AuthUserContainer, AuthUserTitle } from "./StyledComponents";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  return (
    <>
      <AuthUserContainer>
        <AuthUserTitle>Login</AuthUserTitle>
        <LoginForm />
      </AuthUserContainer>
    </>
  );
};

export default Login;

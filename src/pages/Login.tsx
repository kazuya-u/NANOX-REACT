import { AuthUserContainer, AuthUserTitle } from "../feature/AuthUser/StyledComponents";
import LoginForm from "../feature/AuthUser/LoginForm";

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

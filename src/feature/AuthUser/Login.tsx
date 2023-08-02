import { AuthUserContainer, AuthUserTitle } from "./StyledComponents";
import LoginForm from "./LoginForm";
import { getUserIdFromLocalStorage } from "./utils/LocalStorageUtils";

const Login: React.FC = () => {
  const isAuth = getUserIdFromLocalStorage();
  if (isAuth == null) {
    return (
      <>
        <AuthUserContainer>
          <AuthUserTitle>Login</AuthUserTitle>
          <LoginForm />
        </AuthUserContainer>
      </>
    );
  }
};

export default Login;

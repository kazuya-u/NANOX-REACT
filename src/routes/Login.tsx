import LoginForm from "src/components/LoginForm";
import styled from "styled-components";

const Login: React.FC = () => {
  return (
    <>
      <Container>
        <Title>Login</Title>
        <LoginForm />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export default Login;

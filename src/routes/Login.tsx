import { useForm } from "react-hook-form";
import styled from "styled-components";

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <>
      <Container>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <InputLabel htmlFor="email">Email</InputLabel>
            <InputField
              id="email"
              {...register('email')}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel htmlFor="password">パスワード</InputLabel>
            <InputField 
              id="password"
              {...register('password')}
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <SubmitButton type="submit">ログイン</SubmitButton>
          </InputWrapper>
        </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  border: 1px solid #ccc;
  padding: 20px 20px 32px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  /* width: 100px; */
`;

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  /* width: 100%; */
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Login;

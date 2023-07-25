import { useForm } from "react-hook-form";
import styled from "styled-components";

type FormData = {
  data: [
    email: string,
    password: string
  ]
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<FormData>({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <InputLabel htmlFor="email">Email</InputLabel>
          <InputField
            id="email"
            {...register('email', {
              required: {
                value: true,
                message: '入力必須',
              }
            })
            }
          />
          {errors.email?.message && <ErrorMessage>入力が必須の項目です。</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <InputLabel htmlFor="password">パスワード</InputLabel>
          <InputField
            id="password"
            {...register('password', {
              required: {
                value: true,
                message: '入力が必須',
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'アルファベットのみ入力してください。',
              },
              minLength: {
                value: 8,
                message: '8文字以上入力してください。',
              },
            })}
            type="password"
          />
          {errors.password?.type === 'required' && <ErrorMessage>入力が必須の項目です。</ErrorMessage>}
          {errors.password?.type === "pattern" && <ErrorMessage>アルファベットのみ</ErrorMessage>}
          {errors.password?.type === 'minLength' && (<ErrorMessage>8文字以上入力してください。</ErrorMessage>)}
        </InputWrapper>
        <InputWrapper>
          <SubmitButton type="submit" disabled={!isDirty || !isValid}>ログイン</SubmitButton>
        </InputWrapper>
      </Form>

    </>
  )
}


type ButtonDisabledProps = {
  disabled?: boolean
}

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
  width: 60%;
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
`;

const SubmitButton = styled.button<ButtonDisabledProps>`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ disabled }) => disabled ? '#f2f2f2' : '#333'};
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;

export default LoginForm;

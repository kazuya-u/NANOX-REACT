import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

type FormData = {
  user: string;
  password: string;
};

interface CurrentUser {
  type: string;
  id: string;
  attributes: {
    display_name: string;
  };
}

const LoginForm: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<FormData>({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const onSubmit = async (data: FormData) => {
    console.log(data);
    const endpoint = 'https:/drupal.sandbox.dev.lando/user/login?_format=json';
    try {
      const loginResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        },
        body: JSON.stringify({
          name: data.user,
          pass: '@'
        }),
      });
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('ログインに成功しました。', loginData);
        const currentUserName = loginData.current_user.name;
        const getUserResponse = await fetch('http://drupal.sandbox.dev.lando/jsonapi/user/user');
        const users = await getUserResponse.json();
        console.log(users.data, 'users');
        const userInfo = users.data.find((data: CurrentUser) => data.attributes.display_name === currentUserName);
        if (userInfo) {
          setUserId(userInfo.id);
        }
        console.log(userId);
      } else {
        console.error('ログインに失敗しました。', loginResponse);
      }


    } catch (error) {
      console.error('ネットワークエラー', error);
    }
  }
  
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <InputLabel htmlFor="user">User名</InputLabel>
          <InputField
            id="user"
            {...register('user', {
              required: {
                value: true,
                message: '入力必須',
              }
            })
            }
          />
          {errors.user?.message && <ErrorMessage>入力が必須の項目です。</ErrorMessage>}
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

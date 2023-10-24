import { AuthUserForm, AuthUserInputField, AuthUserInputLabel, AuthUserInputWrapper, AuthUserSubmitButton, AuthUserErrorMessage } from "./StyledComponents";
import { getIds, getToken } from "./utils/ApiUtils";
import { currentUserSettinsIdInLocalStorage, setAccessTokenLocalStorage, setUserIdInLocalStorage } from "./utils/LocalStorageUtils";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

type FormData = {
  user: string;
  password: string;
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
  
  const onSubmit = async (data: FormData) => {
    try {
      const authData = await getToken(data.user, data.password);
      setAccessTokenLocalStorage(authData.access_token);
      const IdDatas = await getIds();
      setUserIdInLocalStorage(IdDatas.UserId);
      currentUserSettinsIdInLocalStorage(IdDatas.UsId);
      toast.done('ログインしました。');
      window.location.reload();
    } catch (error) {
      handleLoginError(error);
    }
  };
  const handleLoginError = (error: unknown) => {
    if (error instanceof Error) {
      console.error('ログインできませんでした。', error);
      toast.error('ログインできませんでした。');
    } else {
      console.error('不明なエラーが発生しました。', error);
      toast.error('不明なエラーが発生しました。');
    }
  };

  return (
    <>
      <AuthUserForm onSubmit={handleSubmit(onSubmit)}>
        <AuthUserInputWrapper>
          <AuthUserInputLabel htmlFor="user">User名</AuthUserInputLabel>
          <AuthUserInputField
            id="user"
            {...register('user', {
              required: {
                value: true,
                message: '入力必須',
              }
            })
            }
          />
          {errors.user?.message && <AuthUserErrorMessage>入力が必須の項目です。</AuthUserErrorMessage>}
        </AuthUserInputWrapper>
        <AuthUserInputWrapper>
          <AuthUserInputLabel htmlFor="password">パスワード</AuthUserInputLabel>
          <AuthUserInputField
            id="password"
            {...register('password', {
              required: {
                value: true,
                message: '入力が必須',
              },
              minLength: {
                value: 1,
                message: '1文字以上入力してください。',
              },
            })}
            type="password"
          />
          {errors.password?.type === 'required' && <AuthUserErrorMessage>入力が必須の項目です。</AuthUserErrorMessage>}
          {errors.password?.type === "pattern" && <AuthUserErrorMessage>アルファベットのみ</AuthUserErrorMessage>}
          {errors.password?.type === 'minLength' && (<AuthUserErrorMessage>8文字以上入力してください。</AuthUserErrorMessage>)}
        </AuthUserInputWrapper>
        <AuthUserInputWrapper>
          <AuthUserSubmitButton type="submit" disabled={!isDirty || !isValid}>ログイン</AuthUserSubmitButton>
        </AuthUserInputWrapper>
      </AuthUserForm>

    </>
  )
}

export default LoginForm;

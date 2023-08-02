import { styled } from "styled-components";

type ButtonDisabledProps = {
  disabled?: boolean
}

export const AuthUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const AuthUserTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const AuthUserForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  border: 1px solid #ccc;
  padding: 20px 20px 32px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AuthUserInputWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export const AuthUserInputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const AuthUserInputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const AuthUserSubmitButton = styled.button<ButtonDisabledProps>`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ disabled }) => disabled ? '#f2f2f2' : '#333'};
`;

export const AuthUserErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;

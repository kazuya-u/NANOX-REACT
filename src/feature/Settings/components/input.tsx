import { useRef, useState } from "react";
import styled from "styled-components";
import { SyncValue } from "../api/utils";

interface Input {
  id: string | null,
  defaultValue: string,
  label: string,
  fieldName: string,
  inputType: string,
}

export const ProfileInputField: React.FC<Input> = ({ id, defaultValue, label, fieldName, inputType }) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchData = async () => {
    try {
      if (id !== null) {
        await SyncValue(id, inputValue, fieldName);
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (e.type === 'paste') {
      fetchData();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };
  const handleBlur = () => {
    fetchData();
  };
  return (
    <>
      <StyledFormItem>
        <StyledLabel>
          {label}
        </StyledLabel>
        <StyledInputTextWrapper>
          <StyledInputText
            type={inputType}
            value={inputValue ?? ''}
            onChange={(e) => setInputValue(e.target.value)}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            ref={inputRef}
          />
        </StyledInputTextWrapper>
      </StyledFormItem>
    </>
  );
}

const StyledFormItem = styled.div`
  margin-left: 20px;
  width: 450px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: rgba(55, 53, 47, 0.65);
`;

const StyledInputTextWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: 4px 10px;
  position: relative;
  border-radius: 4px;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
  background: rgb(251, 251, 250);
  cursor: text;
`;

const StyledInputText = styled.input`
  font-size: inherit;
  line-height: inherit;
  border: none;
  background: none;
  width: 100%;
  display: block;
  resize: none;
  padding: 0px;
  :focus-visible {
    outline: none;
  }
`;

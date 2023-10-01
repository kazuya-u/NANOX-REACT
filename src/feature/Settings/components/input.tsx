import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { SyncValue } from "../api/utils";

interface Input {
  id: string | null,
  defaultValue: string | undefined,
  label: string,
  fieldName: string,
}

export const InputText: React.FC<Input> = ({ id, defaultValue, label, fieldName }) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue || '');
  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );
  const fetchData = useCallback(async () => {
    try {
      if (!id) return;
      if (!inputValue) return;
      await SyncValue(id, inputValue, fieldName);
    } catch (error) {
      // No script.
    }
  }, [inputValue, id, fieldName]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <StyledFormItem>
      <StyledLabel>
        {label}
      </StyledLabel>
      <StyledInputTextWrapper>
        <StyledInputText type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </StyledInputTextWrapper>
    </StyledFormItem>
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

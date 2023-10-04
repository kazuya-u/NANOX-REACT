import { StyledInputDescription, StyledInputText } from '../../../feature/UserInterface/styles/components';
import { SyncDescription } from '../api/Patch/SyncDescription';
import { SyncTitle } from '../api/Patch/SyncTitle';
import { toast } from 'react-toastify';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { SyncDeadline } from '../api/Patch/SyncDeadline';

interface Input {
  id: string | undefined,
  defaultValue: string | undefined,
}
interface InputValue {
  id: string,
  defaultValue: string,
}

export const InputTitle: React.FC<Input> = ({ id, defaultValue }) => {
  if (defaultValue === undefined || id === undefined) {
    return (
      <StyledInputText
        type="text"
        value="Loading..."
        readOnly
      />
    )
  }
  else {
    return (
      <InputTitleValue id={id} defaultValue={defaultValue} />
    )
  }
}

const InputTitleValue: React.FC<InputValue> = ({ id, defaultValue }) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );
  const fetchData = useCallback(async () => {
    try {
      if (id === undefined) return;
      if (inputValue.length === 0) return;
      await SyncTitle(inputValue, id);
    } catch (error) {
      toast.error('エラーです。');
    }
  }, [inputValue, id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <StyledInputText
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export const InputDescription: React.FC<Input> = ({ id, defaultValue }) => {
  if (defaultValue === undefined || id === undefined) {
    return (
      <InputDescriptionLoading />
    )
  }
  else {
    return (
      <InputDescriptionValue id={id} defaultValue={defaultValue} />
    )
  }
}

const InputDescriptionLoading: React.FC = () => {
  return (
    <StyledInputDescription
      defaultValue='読み込み中...'
    />
  )
}

const InputDescriptionValue: React.FC<InputValue> = ({ id, defaultValue }) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(event.target.value);
    },
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inputValue.length !== 0) {
          await SyncDescription(inputValue, id);
        }
      } catch (error) {
        toast.error('通信エラーが発生しました。');
        console.error('通信エラー:', error);
      }
    };
    fetchData();
  }, [id, inputValue]);
  return (
    <StyledInputDescription
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}

export const InputDeadLine: React.FC<Input> = ({ id, defaultValue }) => {
  if (defaultValue === undefined || id === undefined) {
    return (
      <InputDeadLineLoading />
    )
  }
  else {
    return (
      <InputDeadLineValue id={id} defaultValue={defaultValue} />
    )
  }
}
const InputDeadLineLoading: React.FC = () => {
  return (
    <StyledInputDateTimeWrapper>
      <StyledInputDateTime
        type="datetime-local"
      />
    </StyledInputDateTimeWrapper>
  )
}

const InputDeadLineValue: React.FC<InputValue> = ({ id, defaultValue }) => {
  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);
  const defaultDateTime = new Date(defaultValue);
  const year = String(defaultDateTime.getFullYear());
  const month = String(defaultDateTime.getMonth() + 1).padStart(2, '0');
  const day = String(defaultDateTime.getDate()).padStart(2, '0');
  const hours = String(defaultDateTime.getHours()).padStart(2, '0');
  const minutes = String(defaultDateTime.getMinutes()).padStart(2, '0');
  defaultValue = `${year}-${month}-${day}T${hours}:${minutes}`;
  const [inputValue, setInputValue] = useState<string | undefined>(defaultValue);
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );
  const fetchData = useCallback(async () => {
    try {
      if (id !== undefined && inputValue !== undefined) {
        await SyncDeadline(inputValue, id);
      }
    } catch (error) {
      console.log('通信がミスる。');
      console.error(error);
    }
  }, [inputValue, id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <StyledInputDateTimeWrapper>
      <StyledInputDateTime
        type="datetime-local"
        value={inputValue ? inputValue : ''}
        onChange={handleInputChange}
      />
    </StyledInputDateTimeWrapper>
  )
}


const StyledInputDateTimeWrapper = styled.div`
  /* width: 100%; */
`;

const StyledInputDateTime = styled.input`
  border-color: hsl(0, 0%, 80%);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  font-size: 12px;
  letter-spacing: 1px;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 14px;
  height: 38px;
`;

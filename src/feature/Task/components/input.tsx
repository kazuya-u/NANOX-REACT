import { StyledInputDescription, StyledInputText } from '../../../feature/UserInterface/styles/components';
import { SyncDescription } from '../api/Patch/SyncDescription';
import { SyncTitle } from '../api/Patch/SyncTitle';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { SyncDeadline } from '../api/Patch/SyncDeadline';

interface ContainerProps {
  id: string | undefined,
  defaultValue: string;
}

export const ContainerInputTitle: React.FC<ContainerProps> = ({ id, defaultValue }) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchData = async () => {
    try {
      if (id !== undefined && inputValue.length !== 0) {
        await SyncTitle(inputValue, id);
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
    <StyledInputText
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      ref={inputRef}
    />
  )
}

export const ContainerInputDescription: React.FC<ContainerProps> = ({ id, defaultValue }) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fetchData = async () => {
    try {
      if (id !== undefined) {
        console.log('通信');
        await SyncDescription(inputValue, id);
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (e.type === 'paste') {
      fetchData();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };
  const handleBlur = () => {
    fetchData();
  };
  return (
    <StyledInputDescription
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      ref={inputRef}
    />
  )
}

export const ContainerInputDeadLine: React.FC<ContainerProps> = ({ id, defaultValue }) => {
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

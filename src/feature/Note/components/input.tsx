import { StyledInputDescription, StyledInputText } from '../../../feature/UserInterface/styles/components';
import { SyncDescription } from '../api/Patch/SyncDescription';
import { SyncTitle } from '../api/Patch/SyncTitle';
import React, { useState, useRef } from 'react';

interface Input {
  id: string | undefined,
  defaultValue: string;
}

export const InputTitle: React.FC<Input> = ({ id, defaultValue }) => {
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
    <div>
      <StyledInputText
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        ref={inputRef}
      />
    </div>
  );
}

export const InputDescription: React.FC<Input> = ({ id, defaultValue }) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fetchData = async () => {
    try {
      if (id !== undefined) {
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
  );
}

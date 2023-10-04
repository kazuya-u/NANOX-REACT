import { StyledInputDescription, StyledInputText } from '../../../feature/UserInterface/styles/components';
import { SyncDescription } from '../api/Patch/SyncDescription';
import { SyncTitle } from '../api/Patch/SyncTitle';
import { toast } from 'react-toastify';
import React, { useState, useEffect, useCallback } from 'react';

interface Input {
  id: string | undefined,
  defaultValue: string | undefined,
}

export const InputTitle: React.FC<Input> = ({ id, defaultValue }) => {
  const [inputValue, setInputValue] = useState<string | undefined>(defaultValue);
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
      if (id  === undefined) return;
      if (!inputValue) return;
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
  const [inputValue, setInputValue] = useState<string | undefined>(defaultValue);
  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(event.target.value);
    },
    []
  );
  const fetchData = useCallback(async () => {
    try {
      if (id  === undefined) return;
      if (!inputValue) return;
      await SyncDescription(inputValue, id);
    } catch (error) {
      console.error(error);
    }
  }, [inputValue, id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
      <StyledInputDescription
        // type="textare"
        value={inputValue}
        onChange={handleInputChange}
      />
  );
}

import { StyledInputDescription, StyledInputText } from '../../../feature/UserInterface/styles/components';
import { SyncDescription } from '../api/Patch/SyncDescription';
import { SyncTitle } from '../api/Patch/SyncTitle';
import { toast } from 'react-toastify';
import React, { useState, useEffect, useCallback } from 'react';

interface InputTitleType {
  id: string,
  defaultValue: string,
}

interface InputDescriptionType {
  id: string,
  defaultValue: string,
}

export const InputTitle: React.FC<InputTitleType> = ({ id, defaultValue }) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue || '');

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );
  const fetchData = useCallback(async () => {
    try {
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

export const InputDescription: React.FC<InputDescriptionType> = ({ id, defaultValue }) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue || '');

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );
  const fetchData = useCallback(async () => {
    try {
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
      type="text"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}

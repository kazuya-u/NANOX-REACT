import React, { useState, useEffect, useCallback } from 'react';
import { syncTitle } from '../api/Patch/SyncTitle';
import { SyncDescription } from '../api/Patch/SyncDescription';
import { toast } from 'react-toastify';

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
      await syncTitle(inputValue, id);
    } catch (error) {
      toast.error('エラーです。');
    }
  }, [inputValue, id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <input
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
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

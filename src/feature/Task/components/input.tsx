import { BASE_API_URL } from '../../../utils/EndPoint';
import { getAccessTokenFromLocalStorage } from '../../../feature/AuthUser/utils/LocalStorageUtils';
import { patchData } from '../utils/Utils';
import { TaskDataType } from '../type/Index';
import React, { useState, useEffect, useCallback } from 'react';

interface InputTitleType {
  id: string,
  defaultValue: string,
}

async function syncTitle(value: string, id: string) {
  const endpoint = `${BASE_API_URL
    }/jsonapi/node/task/${id}`;
  const bodyData: TaskDataType = {
    data: {
      id: id,
      type: "node--task",
      attributes: {
        title: value,
      },
    },
  };
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${accessToken}`,
  }
  patchData(endpoint, headers, bodyData);
}


const InputTitle: React.FC<InputTitleType> = ({ id, defaultValue }) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue || '');

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );
  const fetchData = useCallback(async () => {
    try {
      const result = await syncTitle(inputValue, id);
      console.log(result);
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

export default InputTitle;

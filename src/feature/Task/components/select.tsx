import { toast } from 'react-toastify';
import { BASE_API_URL } from '../../../utils/EndPoint';
import { GetOptions } from '../api/GetData';
import { SyncProject } from '../api/Patch/SyncProject';
import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

interface SelectProjectType {
  id: string;
  defaultValue: {
    label: string,
    value: string,
  }
}

export const SelectProject: React.FC<SelectProjectType> = ({ id, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState<OptionType>(defaultValue);
  const handleOptionChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setSelectedOption(selectedOption);
    }
  };
  const fetchData = useCallback(async () => {
    try {
      await SyncProject(selectedOption, id);
    } catch (error) {
      toast.error('エラーです。');
    }
  }, [id, selectedOption]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  return (
    <div>
      <Select
        defaultValue={defaultValue}
        isSearchable
        value={selectedOption}
        onChange={handleOptionChange}
        options={GetOptions(
          `${BASE_API_URL}/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name`
        )}
      />
    </div>
  );
}

import { BASE_API_URL } from '../../../utils/EndPoint';
import { GetOptions } from '../api/GetData';
import { MultiValue } from "react-select";
import { PostTag } from '../api/Post/PostTag';
import { SyncProject } from '../api/Patch/SyncProject';
import { SyncStatus } from '../api/Patch/SyncStatus';
import { SyncTags } from '../api/Patch/SyncTags';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

interface SelectPropsType {
  id: string | undefined;
  defaultValue: {
    label: string,
    value: string,
  } | undefined,
}

interface MultiSelectPropsType {
  id: string | undefined;
  defaultValue: {
    label: string,
    value: string,
  }[];
}

export const SelectProject: React.FC<SelectPropsType> = ({ id, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | undefined>(defaultValue);
  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);
  const handleOptionChange = (selectedOption: OptionType | undefined) => {
    if (selectedOption !== undefined) {
      setSelectedOption(selectedOption);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== undefined && selectedOption !== undefined) {
          await SyncProject(selectedOption, id);
        }
      } catch (error) {
        toast.error('エラーです。');
      }
    };
    if (defaultValue !== undefined && selectedOption !== defaultValue) {
      fetchData();
    }
  }, [id, selectedOption, defaultValue]);
  return (
    <div>
      <Select
        isSearchable
        value={selectedOption}
        onChange={handleOptionChange}
        options={GetOptions(
          `${BASE_API_URL}/jsonapi/uc/project?fields[uc--project]=title`
        )}
      />
    </div>
  );
}

export const SelectStatus: React.FC<SelectPropsType> = ({ id, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | undefined>(defaultValue);
  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);
  const handleOptionChange = (selectedOption: OptionType | undefined) => {
    if (selectedOption !== undefined) {
      setSelectedOption(selectedOption);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== undefined && selectedOption !== undefined) {
          await SyncStatus(selectedOption, id);
        }
      } catch (error) {
        toast.error('エラーです。');
      }
    };
    if (defaultValue !== undefined && selectedOption !== defaultValue) {
      fetchData();
    }
  }, [id, selectedOption, defaultValue]);
  return (
    <div>
      <Select
        isSearchable
        value={selectedOption}
        onChange={handleOptionChange}
        options={GetOptions(
          `${BASE_API_URL}/jsonapi/uc/status?fields[uc--status]=title`
        )}
      />
    </div>
  );
}

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string, id: string) => ({
  label,
  value: id,
});

export const SelectTags: React.FC<MultiSelectPropsType> = ({ id, defaultValue }) => {
  const optionData = GetOptions(`${BASE_API_URL}/jsonapi/uc/tag?fields[uc--tag]=title`);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<MultiValue<Option>>(optionData);
  const [values, setValues] = useState<MultiValue<Option> | null>(defaultValue);
  const handleCreate = async (inputValue: string) => {
    const createdOptionId = await PostTag(inputValue);
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue, createdOptionId);
      setIsLoading(false);
      setValues((prevValues) => (prevValues ? [...prevValues, newOption] : [newOption]));
      setOptions((prevOptions) => [...prevOptions, newOption]);
    }, 1000);
  };
  const handleChange = (selectedOption: MultiValue<OptionType> | null) => {
    if (selectedOption) {
      setValues(selectedOption);
    }
  };
  const fetchData = useCallback(async () => {
    try {
      if (values) {
        if (id !== undefined && values) {
          await SyncTags(values, id);
        }
      }
    } catch (error) {
      toast.error('エラーです。');
    }
  }, [id, values]);
  useEffect(() => {
    fetchData();
  }, [id, fetchData]);
  return (
    <div>
      <CreatableSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        isMulti
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={options}
        value={values}
      />
    </div>
  );
}

import { BASE_API_URL } from '../../../utils/EndPoint';
import { GetOptions } from '../api/GetData';
import { SyncProject } from '../api/Patch/SyncProject';
import { SyncStatus } from '../api/Patch/SyncStatus';
import { toast } from 'react-toastify';
import CreatableSelect, { MultiValue } from "react-select";
import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { SyncTags } from '../api/Patch/SyncTags';

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

interface SelectTagsType {
  id: string;
  defaultValue: {
    label: string,
    value: string,
  }[];

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

export const SelectStatus: React.FC<SelectProjectType> = ({ id, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState<OptionType>(defaultValue);
  const handleOptionChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      setSelectedOption(selectedOption);
    }
  };
  const fetchData = useCallback(async () => {
    try {
      await SyncStatus(selectedOption, id);
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
          `${BASE_API_URL}/jsonapi/taxonomy_term/status?fields[taxonomy_term--status]=name`
        )}
      />
    </div>
  );
}

export const SelectTags: React.FC<SelectTagsType> = ({ id, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState<MultiValue<OptionType>>(defaultValue);
  const handleOptionChange = (selectedOption: MultiValue<OptionType> | null) => {
    if (selectedOption) {
      setSelectedOption(selectedOption);
    }
  };
  const fetchData = useCallback(async () => {
    try {
      console.log(selectedOption);
      await SyncTags(selectedOption, id);
    } catch (error) {
      toast.error('エラーです。');
    }
  }, [id, selectedOption]);
  useEffect(() => {
    fetchData();
  }, [id, fetchData]);
  return (
    <div>
      <CreatableSelect
        defaultValue={defaultValue}
        isClearable
        isMulti
        isSearchable
        value={selectedOption}
        onChange={handleOptionChange}
        options={GetOptions(
          `${BASE_API_URL}/jsonapi/taxonomy_term/tags?fields[taxonomy_term--tags]=name`
        )}
        placeholder="Tag"
      />
    </div>
  );
}

import { BASE_API_URL } from '../../../utils/EndPoint';
import { GetOptions } from '../api/GetData';
import { SyncProject } from '../api/Patch/SyncProject';
import { syncTitle } from '../api/Patch/SyncTitle';
import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

export const SelectProject: React.FC<SelectProjectType> = ({ id, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState<ValueType<{ value: string; label: string }>>(defaultValue); // ValueTypeの型定義を使用

  // // 選択肢が変更されたときに呼び出される関数
  // const handleOptionChange = (selectedOption: ValueType<{ value: string; label: string }>) => {
  //   setSelectedOption(selectedOption);

  //   // 選択肢が変更されたときに実行したい処理をここに追加
  //   // 例：選択したオプションの値を使用して他の処理を実行
  // };

  // // 非同期関数を使用して選択肢のデータを取得
  // const fetchOptions = async () => {
  //   try {
  //     const response = await fetch(
  //       `${BASE_API_URL}/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name`
  //     );
  //     const data = await response.json();
  //     return data.options; // 選択肢のデータがどのように構造化されているかに応じて修正
  //   } catch (error) {
  //     console.error('選択肢のデータを取得できませんでした:', error);
  //     return [];
  //   }
  // };

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

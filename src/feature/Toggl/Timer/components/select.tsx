import { Controller, useFormContext } from "react-hook-form";
import { getMe } from "../../utils/GetMe";
import { Project } from "../../Type/Index";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const TimerProjectSelect: React.FC = () => {
  const { control } = useFormContext();
  const [data, setData] = useState<OptionType[]>([{
    label: '読み込み中',
    value: '',
  }]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getMe();
        if (data) {
          const projectData = TrimmingData(data?.projects);
          setData(projectData);
        }

      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };

    fetchProject();
  }, []);
  return (
    <Controller
      control={control}
      name="project"
      render={({ field: { value, onChange } }) => (
        <Select
          isSearchable
          onChange={onChange}
          options={data}
          value={value}
        />
      )}
    />
  );
};

type OptionType = {
  label: string;
  value: string;
}

function TrimmingData(data: Project[]): OptionType[] {
  return data.map((item) => {
    const { name, workspace_id, id } = item;
    return {
      label: name,
      value: `${workspace_id}.${id}`,
    };
  });
}

export default TimerProjectSelect;

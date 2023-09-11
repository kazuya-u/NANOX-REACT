import React, { useEffect, useState } from "react";
import { getMe } from "../../utils/GetMe";
import Select from "react-select";
import { Project } from "../../Type/Index";

const TimerProjectSelect: React.FC = () => {
  const [data, setData] = useState<OptionType[]>([{
    label: '読み込み中',
    value: 0,
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
    <Select
      options={data}
    />
  );
};

type OptionType = {
  label: string;
  value: number;
}

function TrimmingData(data: Project[]): OptionType[] {
  return data.map((item) => {
    const { name, workspace_id } = item;
    return {
      label: name,
      value: workspace_id,
    };
  });
}

export default TimerProjectSelect;

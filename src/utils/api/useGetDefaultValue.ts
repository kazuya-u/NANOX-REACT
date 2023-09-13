import { useFetchData } from "../fetchData";
import { TaskDataType } from "../../feature/Task/type/Index";

interface DefaultValueType {
  TitleDefaultValue: string;
  DescriptionDefaultValue: string;
  ProjectDefaultValue: SelectValueType[];
  StatusDefaultValue: SelectValueType[];
  TagsDefaultValue: {
    value: string;
    label: string;
  }[];
  isLoading: boolean,
}

interface SelectValueType {
  value: string;
  label: string;
}

export function useGetTaskDefaultValue(id: string, dataParams: string): DefaultValueType {
  const { data: TaskData, error } = useFetchData<TaskDataType>(`${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/${id}${dataParams}`);
  if (error) {
    return {
      TitleDefaultValue: "",
      DescriptionDefaultValue: "",
      ProjectDefaultValue: [],
      StatusDefaultValue: [],
      TagsDefaultValue: [],
      isLoading: true,
    };
  }
  if (!TaskData) {
    return {
      TitleDefaultValue: "",
      DescriptionDefaultValue: "",
      ProjectDefaultValue: [],
      StatusDefaultValue: [],
      TagsDefaultValue: [],
      isLoading: true
    };
  }

  const ProjectDefaultValue: SelectValueType[] = (TaskData.included || [])
    .filter((item) => item.type === "taxonomy_term--project")
    .map((item) => ({
      value: item.id,
      label: item.attributes?.name || "",
    }));
  const StatusDefaultValue: SelectValueType[] = (TaskData.included || [])
    .filter((item) => item.type === "taxonomy_term--status")
    .map((item) => ({
      value: item.id,
      label: item.attributes?.name || "",
    }));
  const extractTagData = TaskData.included?.filter(
    (item) => item.type === "taxonomy_term--tags"
  ) || [];
  const TagsDefaultValue = extractTagData.map((tagData) => ({
    value: tagData.id,
    label: tagData.attributes.name,
  }));
  return {
    TitleDefaultValue: TaskData.data.attributes?.title || '',
    DescriptionDefaultValue: TaskData.data.attributes?.field_description || "",
    ProjectDefaultValue,
    StatusDefaultValue,
    TagsDefaultValue,
    isLoading: false,
  }
}

export function useGetNoteDefaultValue(id: string, dataParams: string) {
  const { data: TaskData, error } = useFetchData<TaskDataType>(`${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/${id}${dataParams}`);
  const TitleDefaultValue = TaskData?.data.attributes?.title;
  const DescriptionDefaultValue = TaskData?.data.attributes?.field_description;
  const ProjectDefaultValue = TaskData?.included?.filter(
    (item) => item.type === "taxonomy_term--project"
  ) || [];
  const extractTagData = TaskData?.included?.filter(
    (item) => item.type === "taxonomy_term--tags"
  ) || [];
  const TagsDefaultValue = extractTagData.map((tagData) => ({
    value: tagData.id,
    label: tagData.attributes.name,
  }));
  return {
    TitleDefaultValue,
    DescriptionDefaultValue,
    ProjectDefaultValue,
    TagsDefaultValue,
    isLoading: !error && !TaskData,
  }
}

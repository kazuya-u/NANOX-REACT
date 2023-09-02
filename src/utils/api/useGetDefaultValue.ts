import { useFetchData } from "../fetchData";
import { TaskDataType } from "../../feature/Task/type/Index";

export function useGetTaskDefaultValue(id: string, dataParams: string) {
  const { data: TaskData, error } = useFetchData<TaskDataType>(`${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/${id}${dataParams}`);
  const TitleDefaultValue = TaskData?.data.attributes.title;
  const DescriptionDefaultValue = TaskData?.data.attributes.field_description;
  const ProjectDefaultValue = TaskData?.included?.filter(
    (item) => item.type === "taxonomy_term--project"
  ) || [];
  const StatusDefaultValue = TaskData?.included?.filter(
    (item) => item.type === "taxonomy_term--status"
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
    StatusDefaultValue,
    TagsDefaultValue,
    isLoading: !error && !TaskData,
  }
}

export function useGetNoteDefaultValue(id: string, dataParams: string) {
  const { data: TaskData, error } = useFetchData<TaskDataType>(`${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/${id}${dataParams}`);
  const TitleDefaultValue = TaskData?.data.attributes.title;
  const DescriptionDefaultValue = TaskData?.data.attributes.field_description;
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

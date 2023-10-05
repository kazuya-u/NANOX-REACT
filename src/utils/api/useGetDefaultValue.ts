import { NoteDataType } from "../../feature/Note/type/Index";
import { TaskDataType } from "../../feature/Task/type/Index";
import { useFetchData, useFetchDataNoMutate } from "../fetchData";

interface DefaultValueType {
  TitleDefaultValue: string;
  DescriptionDefaultValue: string;
  DeadlineDefaultValue: string;
  ProjectDefaultValue: SelectValueType[];
  StatusDefaultValue: SelectValueType[];
  TagsDefaultValue: SelectValueType[];
  isLoading: boolean;
}

interface SelectValueType {
  value: string;
  label: string;
}

export function useGetTaskDefaultValue(id: string | undefined, dataParams: string): DefaultValueType {
  const { data: TaskData } = useFetchData<TaskDataType>(`${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/${id}${dataParams}`);
  if (!TaskData) {
    return {
      TitleDefaultValue: "",
      DescriptionDefaultValue: "",
      DeadlineDefaultValue: "",
      ProjectDefaultValue: [],
      StatusDefaultValue: [],
      TagsDefaultValue: [],
      isLoading: true
    };
  }
  const ProjectDefaultValue: SelectValueType[] = (TaskData.included || [])
    .filter((item) => item.type === "uc--project")
    .map((item) => ({
      value: item.id,
      label: item.attributes?.title || "",
    }));
  const StatusDefaultValue: SelectValueType[] = (TaskData.included || [])
    .filter((item) => item.type === "uc--status")
    .map((item) => ({
      value: item.id,
      label: item.attributes?.title || "",
    }));
  const extractTagData = TaskData.included?.filter(
    (item) => item.type === "uc--tag"
  ) || [];
  const TagsDefaultValue = extractTagData.map((tagData) => ({
    value: tagData.id,
    label: tagData.attributes.title,
  }));
  return {
    TitleDefaultValue: TaskData.data.attributes?.title || '',
    DescriptionDefaultValue: TaskData.data.attributes?.field_description || "",
    DeadlineDefaultValue: TaskData.data.attributes?.field_deadline || "",
    ProjectDefaultValue,
    StatusDefaultValue,
    TagsDefaultValue,
    isLoading: false,
  }
}

export function useGetNoteDefaultValue(id: string | undefined, dataParams: string) {
  const { data: TaskData } = useFetchDataNoMutate<NoteDataType>(`${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/note/${id}${dataParams}`);
  const ProjectDefaultValue: SelectValueType[] = (TaskData?.included || [])
    .filter((item) => item.type === "uc--project")
    .map((item) => ({
      value: item.id,
      label: item.attributes?.title || "",
    }));
  const extractTagData = TaskData?.included?.filter(
    (item) => item.type === "uc--tag"
  ) || [];
  const TagsDefaultValue = extractTagData.map((tagData) => ({
    value: tagData.id,
    label: tagData.attributes.title,
  }));
  return {
    TitleDefaultValue: TaskData?.data.attributes?.title || '',
    DescriptionDefaultValue: TaskData?.data.attributes?.field_description || "",
    ProjectDefaultValue,
    TagsDefaultValue,
    isLoading: false,
  }
}

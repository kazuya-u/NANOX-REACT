import { DescriptionTextarea, ProjectSelect, StatusSelect, TagSelect, TaskSubmit, TitleInput } from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { onSubmitPatchData } from "../api/PatchData";
import { TaskBodyDataType, TaskFormData } from "../type/Index";
import { useFetchData } from "../../../utils/fetchData";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ExtractDefaultOptionData } from "../utils/Utils";


const TaskPatchForm: React.FC = () => {
  const methods = useForm<TaskFormData>();
  const pageParams = useParams<{ taskId?: string }>();
  const pageId = typeof pageParams.taskId !== "undefined" ? pageParams.taskId : "";
  
  const onSubmit = async (data: TaskFormData) => {
    await onSubmitPatchData(data, pageId);
  };
  
  const dataParams =
  "?include=field_ref_project,field_ref_tags,field_ref_status&fields[node--task]=name,title,created,field_description&fields[taxonomy_term--project]=name&fields[taxonomy_term--tags]=name&fields[taxonomy_term--status]=name";
  const { data: TaskData } = useFetchData<TaskBodyDataType>(
    `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/${pageId}${dataParams}`
  );
  if (!TaskData) {
    return <div>Loading...</div>
  }
  console.log(TaskData);
  const extractProjectData = TaskData.included?.filter(
    (item) => item.type === "taxonomy_term--project"
  ) || [];
  
  const extractStatusData = TaskData.included?.filter(
    (item) => item.type === "taxonomy_term--status"
  ) || [];
  const extractTagData = TaskData.included?.filter(
    (item) => item.type === "taxonomy_term--tags"
  ) || [];
  interface Tag {
    value: string;
    label: string;
  }

  const defaultTagsData: Tag[] = extractTagData.map((tagData) => ({
    value: tagData.id,
    label: tagData.attributes.name,
  }));
  if (!defaultTagsData) {
    return;
  }
  
  
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <TitleInput
          defaultValue={TaskData.data.attributes.title}
        />
        <ProjectSelect
          defaultValue={ExtractDefaultOptionData(extractProjectData[0])}          
        />
        <DescriptionTextarea
          defaultValue={TaskData.data.attributes.field_description}
        />
        <StatusSelect
          defaultValue={ExtractDefaultOptionData(extractStatusData[0])}
        />
        <TagSelect
          defaultValue={defaultTagsData}
        />
        <TaskSubmit />
      </Form>
    </FormProvider>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 64%;
  margin: 0 auto;
  padding-top: 20px;
`;

export default TaskPatchForm;

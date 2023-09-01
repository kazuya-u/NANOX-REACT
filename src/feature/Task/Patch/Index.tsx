import { DescriptionTextarea, ProjectSelect, StatusSelect, TagSelect, TaskSubmit, TitleInput } from "../components/Input";
import { ExtractDefaultOptionData } from "../utils/Utils";
import { FormProvider, useForm } from "react-hook-form";
import { onSubmitPatchData } from "../api/PatchData";
import { StyledModalForm } from "../../../feature/UserInterface/styles/components";
import { TaskBodyDataType, TaskFormData } from "../type/Index";
import { useFetchData } from "../../../utils/fetchData";
import { useParams } from "react-router-dom";

const dataParams =
"?include=field_ref_project,field_ref_tags,field_ref_status&fields[node--task]=name,title,created,field_description&fields[taxonomy_term--project]=name&fields[taxonomy_term--tags]=name&fields[taxonomy_term--status]=name";

const TaskPatchForm: React.FC = () => {
  const methods = useForm<TaskFormData>();
  const pageParams = useParams<{ taskId?: string }>();
  const pageId = typeof pageParams.taskId !== "undefined" ? pageParams.taskId : "";
  const onSubmit = async (data: TaskFormData) => {
    await onSubmitPatchData(data, pageId);
  };
  
  const { data: TaskData } = useFetchData<TaskBodyDataType>(`${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/${pageId}${dataParams}`);
  
  if (!TaskData) {
    return <div>Loading...</div>
  }
  // Get default value.
  const extractProjectData = TaskData.included?.filter(
    (item) => item.type === "taxonomy_term--project"
  ) || [];
  // Get default value.
  const extractStatusData = TaskData.included?.filter(
    (item) => item.type === "taxonomy_term--status"
  ) || [];
  // Get default value.
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
  
  return (
    <FormProvider {...methods}>
      <StyledModalForm onSubmit={methods.handleSubmit(onSubmit)}>
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
      </StyledModalForm>
    </FormProvider>
  );
};

export default TaskPatchForm;

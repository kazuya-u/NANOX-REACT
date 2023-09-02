import { DescriptionTextarea, ProjectSelect, StatusSelect, TagSelect, SubmitButton, TitleInput } from "../../UserInterface/components/Input";
import { ExtractDefaultOptionData } from "../api/GetData";
import { FormProvider, useForm } from "react-hook-form";
import { onSubmitPatchData } from "../api/PatchData";
import { StyledModalForm } from "../../../feature/UserInterface/styles/components";
import { TaskFormData } from "../type/Index";
import { useParams } from "react-router-dom";
import { useGetTaskDefaultValue } from "../../../utils/api/useGetDefaultValue";

const dataParams =
  "?include=field_ref_project,field_ref_tags,field_ref_status&fields[node--task]=name,title,created,field_description&fields[taxonomy_term--project]=name&fields[taxonomy_term--tags]=name&fields[taxonomy_term--status]=name";

const TaskPatchForm: React.FC = () => {
  const pageParams = useParams<{ taskId?: string }>();
  const pageId = typeof pageParams.taskId !== "undefined" ? pageParams.taskId : "";
  // About PATCH request.
  const methods = useForm<TaskFormData>();
  const onSubmit = async (data: TaskFormData) => {
    await onSubmitPatchData(data, pageId);
  };
  // About default value.
  const { TitleDefaultValue, DescriptionDefaultValue, ProjectDefaultValue, StatusDefaultValue, TagsDefaultValue, isLoading } = useGetTaskDefaultValue(pageId, dataParams);
  if (!isLoading) {
    return (
      <FormProvider {...methods}>
        <StyledModalForm onSubmit={methods.handleSubmit(onSubmit)}>
          <TitleInput defaultValue={TitleDefaultValue} />
          <ProjectSelect defaultValue={ExtractDefaultOptionData(ProjectDefaultValue[0])}/>
          <DescriptionTextarea defaultValue={DescriptionDefaultValue} />
          <StatusSelect defaultValue={ExtractDefaultOptionData(StatusDefaultValue[0])} />
          <TagSelect defaultValue={TagsDefaultValue} />
          <SubmitButton />
        </StyledModalForm>
      </FormProvider>
    );
  }
  return (
    <>
      読み込み中...
    </>
  )
  
};

export default TaskPatchForm;

import { BASE_API_URL } from "../../../utils/EndPoint";
import { useMemo } from "react";
import { ProjectSelect, StatusSelect, TagSelect, SubmitButton } from "../../UserInterface/components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { onSubmitPatchData } from "../api/PatchData";
import { patchData } from "../utils/Utils";
import { StyledModalForm } from "../../../feature/UserInterface/styles/components";
import { TaskDataType, TaskFormData } from "../type/Index";
import { toast } from "react-toastify";
import { useGetTaskDefaultValue } from "../../../utils/api/useGetDefaultValue";
import { useParams } from "react-router-dom";
import { InputTitle } from "../components/input";
import { InputDescription } from "../components/input";
import { SelectProject } from "../components/select";

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

  // About Header info.
  const endpoint = `${BASE_API_URL
    }/jsonapi/node/task/${pageId}`;
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = useMemo(() => ({
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${accessToken}`,
  }), [accessToken]);


  type LabelValueType = {
    label: string;
    value: string;
  }
  const ProjectSubmit = async (data: LabelValueType) => {
    try {
      const bodyData: TaskDataType = {
        data: {
          id: pageId,
          type: "node--task",
          relationships: {
            "field_ref_project": {
              "data": {
                "type": "taxonomy_term--project",
                "id": data.value,
              }
            }
          },
        },
      };

      await patchData(endpoint, headers, bodyData);
    } catch (error) {
      toast.error('タスクを更新できません。')
    }
  };
  const StatusSubmit = async (data: LabelValueType) => {
    try {
      const endpoint = `${BASE_API_URL
        }/jsonapi/node/note/${pageId}`;
      const accessToken = getAccessTokenFromLocalStorage();
      const headers = {
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${accessToken}`,
      };
      const bodyData: TaskDataType = {
        data: {
          id: pageId,
          type: "node--task",
          relationships: {
            "field_ref_status": {
              "data": {
                "type": "taxonomy_term--status",
                "id": data.value,
              }
            }
          },
        },
      };
      await patchData(endpoint, headers, bodyData);

    } catch (error) {
      toast.error('メモを更新できません。')
    }
  };

  // About default value.
  const { TitleDefaultValue, DescriptionDefaultValue, ProjectDefaultValue, StatusDefaultValue, TagsDefaultValue, isLoading } = useGetTaskDefaultValue(pageId, dataParams);
  if (isLoading) {
    return (
      <>Loading...</>
    )
  }
  if (!isLoading) {
    return (
      <FormProvider {...methods}>
        <StyledModalForm onSubmit={methods.handleSubmit(onSubmit)}>
          <InputTitle id={pageId} defaultValue={TitleDefaultValue} />
          <SelectProject />
          <ProjectSelect defaultValue={ProjectDefaultValue[0]} onChangeFunc={ProjectSubmit} />
          <InputDescription id={pageId} defaultValue={DescriptionDefaultValue} />
          <StatusSelect defaultValue={StatusDefaultValue[0]} onChangeFunc={StatusSubmit} />
          <TagSelect defaultValue={TagsDefaultValue} />
          <SubmitButton />
        </StyledModalForm>
      </FormProvider>
    );
  }

};

export default TaskPatchForm;

import { InputDescription } from "../components/input";
import { InputTitle } from "../components/input";
import { SelectProject, SelectStatus, SelectTags } from "../components/select";
import { StyledModalForm } from "../../../feature/UserInterface/styles/components";
import { useGetTaskDefaultValue } from "../../../utils/api/useGetDefaultValue";
import { useParams } from "react-router-dom";

const dataParams =
  "?include=field_ref_project,field_ref_tags,field_ref_status&fields[node--task]=name,title,created,field_description&fields[taxonomy_term--project]=name&fields[taxonomy_term--tags]=name&fields[taxonomy_term--status]=name";

const TaskPatchForm: React.FC = () => {
  const pageParams = useParams<{ taskId?: string }>();
  const pageId = typeof pageParams.taskId !== "undefined" ? pageParams.taskId : "";

  // About default value.
  const { TitleDefaultValue, DescriptionDefaultValue, ProjectDefaultValue, StatusDefaultValue, TagsDefaultValue, isLoading } = useGetTaskDefaultValue(pageId, dataParams);
  if (isLoading) {
    return (
      <>Loading...</>
    )
  }
  if (!isLoading) {
    return (
      <StyledModalForm>
        <InputTitle id={pageId} defaultValue={TitleDefaultValue} />
        <SelectProject id={pageId} defaultValue={ProjectDefaultValue[0]} />
        <InputDescription id={pageId} defaultValue={DescriptionDefaultValue} />
        <SelectStatus id={pageId} defaultValue={StatusDefaultValue[0]} />
        <SelectTags id={pageId} defaultValue={TagsDefaultValue} />
      </StyledModalForm>
    );
  }
};

export default TaskPatchForm;

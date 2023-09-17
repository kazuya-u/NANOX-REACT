import { InputDescription } from "../components/input";
import { InputTitle } from "../components/input";
import { SelectProject, SelectStatus, SelectTags } from "../components/select";
import { StyledModalForm } from "../../../feature/UserInterface/styles/components";
import { useGetTaskDefaultValue } from "../../../utils/api/useGetDefaultValue";

const dataParams =
  "?include=field_ref_project,field_ref_tags,field_ref_status&fields[node--task]=name,title,created,field_description&fields[taxonomy_term--project]=name&fields[taxonomy_term--tags]=name&fields[taxonomy_term--status]=name";

type PropsType = {
  id: string;
}

const TaskPatchForm: React.FC<PropsType> = ({ id }) => {
  const pageId = id;
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

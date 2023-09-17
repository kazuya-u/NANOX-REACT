import { InputDescription } from "../components/input";
import { InputTitle } from "../components/input";
import { SelectProject, SelectTags } from "../components/select";
import { StyledModalForm } from "../../../feature/UserInterface/styles/components";
import { useGetNoteDefaultValue } from "../../../utils/api/useGetDefaultValue";

const dataParams =
  "?include=field_ref_project,field_ref_tags&fields[node--note]=name,title,created,field_description&fields[taxonomy_term--project]=name&fields[taxonomy_term--tags]=name";


type PropsType = {
  id: string;
}

const NotePatchForm: React.FC<PropsType> = ({ id }) => {
  const pageId = id;
  // About default value.
  const { TitleDefaultValue, DescriptionDefaultValue, ProjectDefaultValue, TagsDefaultValue, isLoading } = useGetNoteDefaultValue(pageId, dataParams);
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
        <SelectTags id={pageId} defaultValue={TagsDefaultValue} />
      </StyledModalForm>
    );
  }
};

export default NotePatchForm;

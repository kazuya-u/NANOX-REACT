import { InputDescription } from "../components/input";
import { InputTitle } from "../components/input";
import { SelectProject, SelectTags } from "../components/select";
import { StyledModalForm } from "../../../feature/UserInterface/styles/components";
import { useGetNoteDefaultValue } from "../../../utils/api/useGetDefaultValue";
import styled from "styled-components";
import { GoProject, GoTag } from "react-icons/go";

const dataParams =
  "?include=field_ref_project,field_ref_tag&fields[node--note]=name,title,created,field_description&fields[uc--project]=title&fields[uc--tag]=title";


type PropsType = {
  id: string | undefined;
}

const NotePatchForm: React.FC<PropsType> = ({ id }) => {
  // About default value.
  const { TitleDefaultValue, DescriptionDefaultValue, ProjectDefaultValue, TagsDefaultValue, isLoading } = useGetNoteDefaultValue(id, dataParams);

  if (!isLoading) {
    return (
      <StyledModalForm>
        <InputTitle id={id} defaultValue={TitleDefaultValue} />
        <StyledSelectWrapper>
          <StyledSelectItemWrapper>
            <StyledLabelWrapper>
              <StyledLabelIcon><GoProject /></StyledLabelIcon>
              <StyledLabelText>Project</StyledLabelText>
            </StyledLabelWrapper>
            <StyledSelectComponentWrapper>
              <SelectProject id={id} defaultValue={ProjectDefaultValue[0]} />
            </StyledSelectComponentWrapper>
          </StyledSelectItemWrapper>
          <StyledSelectItemWrapper>
            <StyledLabelWrapper>
              <StyledLabelIcon><GoTag /></StyledLabelIcon>
              <StyledLabelText>Tags</StyledLabelText>
            </StyledLabelWrapper>
            <StyledSelectComponentWrapper>
              <SelectTags id={id} defaultValue={TagsDefaultValue} />
            </StyledSelectComponentWrapper>
          </StyledSelectItemWrapper>
        </StyledSelectWrapper>
        <StyledHr />
        <StyledTextarea>
          <InputDescription id={id} defaultValue={DescriptionDefaultValue} />
        </StyledTextarea>
      </StyledModalForm>
    );
  }
};

export default NotePatchForm;

// About Styled.
const StyledSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`

const StyledSelectItemWrapper = styled.div`
  display: flex;
`

const StyledLabelWrapper = styled.span`
  display: flex;
  align-items: center;
  min-width: 110px;
`

const StyledSelectComponentWrapper = styled.span`
  width: 100%;
`

const StyledLabelText = styled.span`
  font-size: 12px;
  font-weight: 600;
`

const StyledLabelIcon = styled.span`
  width: 28px;
  height: 20px;
`

const StyledHr = styled.hr`
  color: #b3b3b3;
`

const StyledTextarea = styled.div`
  height: 100%;
  flex: 1;
`

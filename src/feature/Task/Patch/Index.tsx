import { InputDeadLine, InputDescription } from "../components/input";
import { InputTitle } from "../components/input";
import { SelectProject, SelectStatus, SelectTags } from "../components/select";
import { StyledModalForm } from "../../../feature/UserInterface/styles/components";
import { useGetTaskDefaultValue } from "../../../utils/api/useGetDefaultValue";
import styled from "styled-components";
import { GoMilestone, GoProject, GoTag } from "react-icons/go";

const dataParams =
  "?include=field_ref_project,field_ref_tag,field_ref_status&fields[node--task]=name,title,created,field_description,field_deadline&fields[uc--project]=title&fields[uc--tag]=title&fields[uc--status]=title";

type PropsType = {
  id: string;
}

const TaskPatchForm: React.FC<PropsType> = ({ id }) => {
  const pageId = id;
  // About default value.
  const { TitleDefaultValue, DescriptionDefaultValue, DeadlineDefaultValue, ProjectDefaultValue, StatusDefaultValue, TagsDefaultValue, isLoading } = useGetTaskDefaultValue(pageId, dataParams);
  if (isLoading) {
    return (
      <>Loading...</>
    )
  }
  if (!isLoading) {
    return (
      <StyledModalForm>
        <InputTitle id={pageId} defaultValue={TitleDefaultValue} />
        <StyledSelectWrapper>
          <StyledSelectItemWrapper>
              <StyledLabelWrapper>
                <StyledLabelIcon><GoProject /></StyledLabelIcon>
                <StyledLabelText>Project</StyledLabelText>
              </StyledLabelWrapper>
              <StyledSelectComponentWrapper>
                <SelectProject id={pageId} defaultValue={ProjectDefaultValue[0]} />
              </StyledSelectComponentWrapper>
          </StyledSelectItemWrapper>
          <StyledSelectItemWrapper>
              <StyledLabelWrapper>
                <StyledLabelIcon><GoTag /></StyledLabelIcon>
                <StyledLabelText>Tags</StyledLabelText>
              </StyledLabelWrapper>
              <StyledSelectComponentWrapper>
              <SelectTags id={pageId} defaultValue={TagsDefaultValue} />
              </StyledSelectComponentWrapper>
          </StyledSelectItemWrapper>
          <StyledSelectItemWrapper>
              <StyledLabelWrapper>
                <StyledLabelIcon><GoMilestone /></StyledLabelIcon>
                <StyledLabelText>Status</StyledLabelText>
              </StyledLabelWrapper>
              <StyledSelectComponentWrapper>
              <SelectStatus id={pageId} defaultValue={StatusDefaultValue[0]} />
              </StyledSelectComponentWrapper>
          </StyledSelectItemWrapper>
          <StyledSelectItemWrapper>
              <StyledLabelWrapper>
                <StyledLabelIcon><GoMilestone /></StyledLabelIcon>
                <StyledLabelText>DeadLine</StyledLabelText>
              </StyledLabelWrapper>
              <StyledSelectComponentWrapper>
              <InputDeadLine id={pageId} defaultValue={DeadlineDefaultValue} />
              </StyledSelectComponentWrapper>
          </StyledSelectItemWrapper>
        </StyledSelectWrapper>
        <StyledHr />
        <StyledTextarea>
          <InputDescription id={pageId} defaultValue={DescriptionDefaultValue} />
        </StyledTextarea>
      </StyledModalForm>
    );
  }
};

export default TaskPatchForm;

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

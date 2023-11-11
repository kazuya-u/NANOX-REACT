import { Link } from "react-router-dom";
import { BASE_API_URL } from "../../../utils/EndPoint";
import { useFetchData } from "../../../utils/fetchData";
import styled from "styled-components";
import { RenderCategory, RenderMultipleCategory } from "../../../feature/View/Utils/Utility";

interface FieldRef {
  color_label: string;
  title: string;
}

interface NodeData {
  Nid: string;
  UUID: string;
  Title: string;
  Tag: FieldRef[];
  Project: FieldRef;
  Status: FieldRef;
  field_deadline: string;
  field_description: string;
}

const List: React.FC = () => {
  // const [filterParam, setFilterParam] = useState<OptionType>({ label: 'All', value: '' });
  const { data: TaskData, error } = useFetchData<NodeData[]>(`${BASE_API_URL}/tasks`);
  // const { data: ProjectFetchData } = useFetchData<OptionType[]>(`${BASE_API_URL}/project`);
  // const handleOptionChange = (data: OptionType | null) => {
  //   if (data) {
  //     setFilterParam(data);
  //     mutate(`${BASE_API_URL}/tasks`);
  //   }
  // }
  if (!TaskData && !error) {
    return <div>Loading...</div>
  }
  if (!TaskData) {
    return <div>Loading...</div>;
  }
  // if (!ProjectFetchData) {
  //   return <div>Loading...</div>;
  // }

  // const newItem = { label: 'All', value: '' };
  // const updatedData = [...ProjectFetchData, newItem];
  

  return (
    <>
      <StyledListContainer>
        <StyledListWrapper>
          {TaskData.map((item: NodeData) => (
            <StyledListItem key={item.Nid}>
              <StyledListItemRow to={`/tasks/${item.UUID}`}>
                {/* About Title */}
                <StyledCell1>
                  <StyledCell1Wrapper>
                    <StyledTitle>
                      <StyledTitleWrapper>
                        {item.Title}
                      </StyledTitleWrapper>
                    </StyledTitle>
                  </StyledCell1Wrapper>
                </StyledCell1>

                {/* About Project */}
                <StyledCell2>
                  <StyledCell2Wrapper>
                    <StyledCategory>
                      <StyledCategoryWrapper>
                        <RenderCategory data={item.Project} />
                      </StyledCategoryWrapper>
                    </StyledCategory>
                  </StyledCell2Wrapper>
                </StyledCell2>

                {/* About Tags */}
                <StyledCell2>
                  <StyledCell2Wrapper>
                    <StyledCategory>
                      <StyledCategoryWrapper>
                        <RenderCategory data={item.Tag} isMultiple={true} />
                      </StyledCategoryWrapper>
                    </StyledCategory>
                  </StyledCell2Wrapper>
                </StyledCell2>

                {/* About Status */}
                <StyledCell2>
                  <StyledCell2Wrapper>
                    <StyledCategory>
                      <StyledCategoryWrapper>
                        <RenderCategory data={item.Status} />
                      </StyledCategoryWrapper>
                    </StyledCategory>
                  </StyledCell2Wrapper>
                </StyledCell2>

              </StyledListItemRow>
              {/* <StyledLink to={`/tasks/${item.uuid}`}>
                    <TaskLeftWrapper>
                      <TaskName>{item.title}</TaskName>
                      <TaskDescription>{item.field_description}</TaskDescription>
                      {item.TagName ? <TagContainer><Tag>{item.TagName}</Tag></TagContainer> : ''}
                    </TaskLeftWrapper>
                    <TaskRightWrapper>
                      <Deadline>Due: {item.field_deadline}</Deadline>
                      <Status>Status: {item.field_ref_status}</Status>
                      <ProjectName>{item.ProjectName}</ProjectName>
                    </TaskRightWrapper>
                  </StyledLink> */}
            </StyledListItem>
          ))}
        </StyledListWrapper>
      </StyledListContainer>
      {/* <div>
        <Select
          defaultValue={filterParam}
          onChange={handleOptionChange}
          options={updatedData}
        />
      </div> */}

    </>
  );
};

const StyledListContainer = styled.div`
  position: relative;
`;

const StyledListWrapper = styled.div`
  position: relative;
  min-width: calc((100% - 192px) - 0px);
`;

const StyledListItem = styled.div`
  display: flex;
  height: calc(100% + 2px);
  border-bottom: 1px solid rgb(233, 233, 231);
`;
const StyledListItemRow = styled(Link)`
  display: flex;
`;
const StyledCell1 = styled.div`
  display: flex;
  width: 276px;
  height: calc(100% + 1px);
  position: relative;
  border-right: 1px solid rgb(233, 233, 231);
`;

const StyledCell1Wrapper = styled.div`
  display: flex; overflow-x: clip; height: 100%; width: 276px;
`;

const StyledCell2 = styled.div`
  display: flex;
  width: 112px;
  height: calc(100% + 1px);
  position: relative;
  border-right: 1px solid rgb(233, 233, 231);
`;

const StyledCell2Wrapper = styled.div`
  display: flex;
  overflow-x: clip;
  height: 100%;
  width: 112px;
`;

const StyledTitle = styled.div`
  user-select: none;
  transition: background 20ms ease-in 0s;
  position: relative;
  display: block;
  font-size: 14px;
  overflow: clip;
  width: 100%;
  white-space: normal;
  min-height: 32px;
  padding: 5px 8px 5px 0px;
`;

const StyledTitleWrapper = styled.div`
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  display: inline;
  font-weight: 500;
  background-image: linear-gradient(to right, rgba(55, 53, 47, 0.16) 0%, rgba(55, 53, 47, 0.16) 100%);
  background-repeat: repeat-x;
  background-position: 0px 100%;
  background-size: 100% 1px;
`;

const StyledCategory = styled.div`
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  position: relative;
  display: block;
  font-size: 14px;
  overflow: clip;
  width: 100%;
  white-space: normal;
  min-height: 32px;
  padding: 6px 8px;
`;
const StyledCategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 8px;
`;


export default List;

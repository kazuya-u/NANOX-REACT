import { Deadline, ListItem, ListWrapper, ProjectName, Status, StyledLink, Tag, TagContainer, TaskDescription, TaskLeftWrapper, TaskName, TaskRightWrapper } from "./StyledComponents";
import { useGetViewsData } from "../api/GetData";

type ItemType = {
  field_deadline: string;
  field_description: string;
  field_ref_status: string;
  nid: string;
  ProjectName: string;
  TagName: string;
  title: string;
  uuid: string;
}

const List: React.FC = () => {
  const { data, error } = useGetViewsData<ItemType[]>();
  if (!data && !error) {
    return <div>Loading...</div>
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <ListWrapper>
        {data.map((item: ItemType) => (
          <ListItem key={item.nid}>
            <StyledLink to={`/tasks/${item.uuid}`}>
              <TaskLeftWrapper>
                <TaskName>{item.title}</TaskName>
                <TaskDescription>{item.field_description}</TaskDescription>
                {item.TagName ? <TagContainer><Tag>{item.TagName}</Tag></TagContainer>: ''}
              </TaskLeftWrapper>
              <TaskRightWrapper>
                <Deadline>Due: {item.field_deadline}</Deadline>
                {/* <Status>Status: {item.field_ref_status}</Status> */}
                <ProjectName>{item.ProjectName}</ProjectName>
              </TaskRightWrapper>
            </StyledLink>
          </ListItem>
        ))}
      </ListWrapper>
    </>
  );
};

export default List;

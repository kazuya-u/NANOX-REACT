import { Deadline, ListWrapper, ProjectName, Status, StyledLink, Tag, TagContainer, TaskName } from "./StyledComponents";
import { useGetViewsData } from "../api/GetData";

type ItemType = {
  field_deadline: string;
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
          <li key={item.nid}>
            <StyledLink to={`/tasks/${item.uuid}`}>
              <TaskName>{item.title}</TaskName>
              <ProjectName>Project: {item.ProjectName}</ProjectName>
                {item.TagName ? <TagContainer><Tag>{item.TagName}</Tag></TagContainer>: ''}
              <Deadline>Due: {item.field_deadline}</Deadline>
              <Status>Status: {item.field_ref_status}</Status>
            </StyledLink>
          </li>
        ))}
      </ListWrapper>
    </>
  );
};

export default List;

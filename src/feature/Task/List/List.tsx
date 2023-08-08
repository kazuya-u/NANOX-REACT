import { Deadline, ListWrapper, ProjectName, Status, StyledLink, Tag, TagContainer, TaskName } from "./StyledComponents";
import { useGetViewsData } from "../api/GetData";

type ItemType = {
  field_deadline: string;
  field_ref_status: string;
  nid: string;
  project_name: string;
  tag_name: string;
  title: string;
  uuid: string;
}

const List: React.FC = () => {
  const { data, error } = useGetViewsData<ItemType[]>();
  console.log(data);
  if (!data || !error) {
    return <div>Loading...</div>
  }
  return (
    <>
      <ListWrapper>
        {data.map((item: ItemType) => (
          <li key={item.nid}>
            <StyledLink to={`/items/${item.uuid}`}>
              <TaskName>{item.title}</TaskName>
              <ProjectName>Project: {item.project_name}</ProjectName>
              <TagContainer>
                <Tag>{item.tag_name}</Tag>
              </TagContainer>
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

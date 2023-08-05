import { Container, Deadline, ListWrapper, ProjectName, Status, StyledLink, Tag, TagContainer, TaskName } from "./StyledComponents";
import { useFetchData } from "../../../utils/fetchData";

type SingleTask = {
  field_deadline: string;
  field_ref_status: string;
  ProjectName: string;
  TagName: string;
  title: string;
  uuid: string;
};

const baseUrl = "http://drupal.sandbox.dev.lando/tasks";
const List: React.FC = () => {
  const { data, error, isLoading } = useFetchData(baseUrl);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <>{error}</>;
  return (
    <>
      <Container>
        <ListWrapper>
          {data.map((task: SingleTask) => (
            <li key={task.uuid}>
              <StyledLink to={`/tasks/${task.uuid}`}>
                <TaskName>{task.title}</TaskName>
                <ProjectName>Project: {task.ProjectName}</ProjectName>
                <TagContainer>
                  <Tag>{task.TagName}</Tag>
                </TagContainer>
                <Deadline>Due: {task.field_deadline}</Deadline>
                <Status>Status: {task.field_ref_status}</Status>
              </StyledLink>
            </li>
          ))}
        </ListWrapper>
      </Container>
    </>
  );
};

export default List;

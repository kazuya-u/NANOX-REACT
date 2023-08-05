import { Container, ListItem, ListWrapper, ProjectName, StyledLink, TaskName } from "../StyledComponents";
import { useFetchData } from "../../../utils/fetchData";

const baseUrl = "http://drupal.sandbox.dev.lando/jsonapi/node/task";
const List: React.FC = () => {
  const { data, error, isLoading } = useFetchData(baseUrl);
  
  if (isLoading) return <div>Loading...</div>;
  return (
    <>    
      <Container>
        <ListWrapper>
          {data.data.map((task) => (
            <ListItem key={task.id}>
              <StyledLink to={`/tasks/${task.id}`}>
                <TaskName>{task.attributes.title}</TaskName>
                <ProjectName>Project:</ProjectName>
              </StyledLink>
            </ListItem>
          ))}
        </ListWrapper>
      </Container>
    </>
  );
};

export default List;

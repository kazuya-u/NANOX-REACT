import { Link } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

const baseUrl = "http://drupal.sandbox.dev.lando/jsonapi/node/task";
type baseUrlType = string;
const fetcher = (url: string) => fetch(url).then(r => r.json());
function useTask(baseUrl: baseUrlType) {
  const { data, error } = useSWR(baseUrl, fetcher)
  return {
    data,
    error,
    isLoading: !error && !data,
  }
}

const TaskIndex: React.FC = () => {
  const { data, isError, isLoading } = useTask(baseUrl);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Container>
        <StyledLink to={'/addtask'}>
          Taskの追加
        </StyledLink>
      </Container>
      <Container>
        <List>
          {data.data.map((task) => (
            <ListItem key={task.id}>
              <StyledLink to={`/tasks/${task.id}`}>
                <TaskName>{task.attributes.title}</TaskName>
                <ProjectName>Project:</ProjectName>
              </StyledLink>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 520px;
`;

const ListItem = styled.li`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
`;

const TaskName = styled.h3`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const ProjectName = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 0;
`;

export default TaskIndex;

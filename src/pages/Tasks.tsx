import { PageTitle } from "../feature/UserInterface/StyledComponents";
import TaskFilter from "../feature/Task/List/Filter";
import List from "../feature/Task/List/List";



const Tasks: React.FC = () => {

  return (
    <>
      <PageTitle>Task</PageTitle>
      <TaskFilter />
      <List />
    </>
  );
}

export default Tasks;

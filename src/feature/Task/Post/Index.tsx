import styled from "styled-components";
import { TaskPostForm } from "./components/Form";

const TaskForm: React.FC = () => {
  return (
    <>
      <Heading>Add Task</Heading>
      <TaskPostForm />
    </>
  );
};

const Heading = styled.h2`
  text-align: center;
  font-size: 24px;
  color: #333;
`;

export default TaskForm;

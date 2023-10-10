import styled from "styled-components";
import Nav from "../data/Nav";
import { useFetchData } from "../../../../../utils/fetchData";
import Card from "../data/Card";

interface Task {
  title: string;
  uuid: string;
  field_deadline: string;
  ProjectName: string;
  field_ref_status: string;
  TagName: string;
}

interface IdArray {
  IdArray: Array<string>;
}


const Layout: React.FC<IdArray> = ({ IdArray }) => {
  console.log(IdArray);
  
  const groupingTaskArray: { [key: string]: Task[] } = {};
  const { data: TaskData } = useFetchData<Task[]>(`${import.meta.env.VITE_LANDO_SITE_URL}/front_task?status=${IdArray.join(', ')}`);
  if (TaskData === undefined) {
    return (
      <>
        Loading...
      </>
    )
  }
  TaskData.forEach((task) => {
    if (!groupingTaskArray[task.field_ref_status]) {
      groupingTaskArray[task.field_ref_status] = [];
    }
    groupingTaskArray[task.field_ref_status].push(task);
  });
  const status = Object.keys(groupingTaskArray);

  return (
    <>
      <Nav StatusArray={status} />
      <div>
        <StyledHeight />
        <StyledList>
          {Object.keys(groupingTaskArray).map((status) => (
            <StyledWrapper key={status}>
              {groupingTaskArray[status].map((task) => (
                <div key={task.uuid}>
                  <Card title={task.title} ProjectName={task.ProjectName} TagName={task.TagName} field_deadline={task.field_deadline} uuid={task.uuid} />
                </div>
              ))}
            </StyledWrapper>
          ))}
        </StyledList>
      </div>
    </>
  )
}

const StyledHeight = styled.div`
  height: 42px;
`;

const StyledList = styled.div`
  display: inline-flex; margin: 0px;
`;

const StyledWrapper = styled.div`
flex: 0 0 auto; padding-left: 5px; padding-right: 5px; padding-bottom: 5px; margin-right: 10px; box-sizing: content-box; width: 260px; height: max-content;
`;

export default Layout;

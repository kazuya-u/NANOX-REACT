import { Deadline, ListItem, ListWrapper, ProjectName, Status, StyledLink, Tag, TagContainer, TaskDescription, TaskLeftWrapper, TaskName, TaskRightWrapper } from "./StyledComponents";
import { BASE_API_URL } from "../../../utils/EndPoint";
import { useFetchData } from "../../../utils/fetchData";
import { useState } from "react";
import Select from 'react-select';
import { mutate } from "swr";

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

type OptionType = {
  label: string,
  value: string,
}

const List: React.FC = () => {
  const [filterParam, setFilterParam] = useState<OptionType>({ label: 'All', value: '' });
  const { data, error } = useFetchData<ItemType[]>(`${BASE_API_URL}/tasks?field_ref_project_target_id=${filterParam.value}`);
  const { data: ProjectFetchData } = useFetchData<OptionType[]>(`${BASE_API_URL}/project`);
  const handleOptionChange = (data: OptionType | null) => {
    if (data) {
      setFilterParam(data);
      mutate(`${BASE_API_URL}/tasks`);
    }
  }
  if (!data && !error) {
    return <div>Loading...</div>
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  if (!ProjectFetchData) {
    return <div>Loading...</div>;
  }
  const newItem = { label: 'All', value: '' };
  const updatedData = [...ProjectFetchData, newItem];

  return (
    <>
      <div>
        <Select
          defaultValue={filterParam}
          onChange={handleOptionChange}
          options={updatedData}
        />
      </div>
      <ListWrapper>
        {data.map((item: ItemType) => (
          <ListItem key={item.nid}>
            <StyledLink to={`/tasks/${item.uuid}`}>
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
            </StyledLink>
          </ListItem>
        ))}
      </ListWrapper>
    </>
  );
};

export default List;

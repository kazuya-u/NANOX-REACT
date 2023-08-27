import { DescriptionTextarea, ProjectSelect, StatusSelect, TagSelect, TaskSubmit, TitleInput } from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { onSubmitPatchData } from "../api/PatchData";
import { TaskBodyDataType, TaskFormData } from "../type/Index";
import { useFetchData } from "../../../utils/fetchData";
import { useParams } from "react-router-dom";
import styled from "styled-components";


const TaskPatchForm: React.FC = () => {
  const methods = useForm<TaskFormData>();
  const pageParams = useParams<{ taskId?: string }>();
  const pageId = typeof pageParams.taskId !== "undefined" ? pageParams.taskId : "";
  
  const onSubmit = async (data: TaskFormData) => {
    await onSubmitPatchData(data, pageId);
  };
  
  const { data: TaskData } = useFetchData<TaskBodyDataType>(
    `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/${pageId}`
  );
  if (!TaskData) {
    return <div>Loading...</div>
  }
  
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <TitleInput
          defaultValue={TaskData.data.attributes.title}
        />
        <ProjectSelect />
        <DescriptionTextarea
          defaultValue={TaskData.data.attributes.field_description}
        />
        <StatusSelect />
        <TagSelect />
        <TaskSubmit />
      </Form>
    </FormProvider>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 64%;
  margin: 0 auto;
  padding-top: 20px;
`;

export default TaskPatchForm;

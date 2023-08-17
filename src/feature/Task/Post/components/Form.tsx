import { DescriptionTextarea, StatusSelect, TagSelect, TaskSubmit, TitleInput } from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { onSubmit } from "../Post";
import { TaskFormData } from "../../type/Index";
import styled from "styled-components";

export const TaskPostForm: React.FC = () => {
  const methods = useForm<TaskFormData>();
  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <TitleInput />
          <DescriptionTextarea />
          <StatusSelect />
          <TagSelect />
          <TaskSubmit />
        </Form>
      </FormProvider>
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

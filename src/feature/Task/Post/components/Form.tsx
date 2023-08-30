import { DescriptionTextarea, ProjectSelect, StatusSelect, TagSelect, TaskSubmit, TitleInput } from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { onSubmitPostData } from "../../api/PostData";
import { TaskFormData } from "../../type/Index";
import { StyledModalForm } from "../../../../feature/UserInterface/styles/components";

export const TaskPostForm: React.FC = () => {
  const methods = useForm<TaskFormData>();
  return (
    <>
      <FormProvider {...methods}>
        <StyledModalForm onSubmit={methods.handleSubmit(onSubmitPostData)}>
          <TitleInput />
          <ProjectSelect />
          <DescriptionTextarea />
          <StatusSelect />
          <TagSelect />
          <TaskSubmit />
        </StyledModalForm>
      </FormProvider>
    </>
  )
}

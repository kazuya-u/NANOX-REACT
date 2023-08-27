import { DescriptionTextarea, ProjectSelect, StatusSelect, TagSelect, TaskSubmit, TitleInput } from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { onSubmitPatchData } from "../api/PatchData";
import { TaskFormData } from "../type/Index";
import { useFetchData } from "../../../utils/fetchData";
import { useParams } from "react-router-dom";


type DateType = {
  data: {
    attributes: {
      title: string;
      field_description: string;
    }
  }
}

const Index: React.FC = () => {
  const methods = useForm<TaskFormData>();
  const pageParams = useParams<{ taskId?: string }>();
  const onSubmit = async (data: TaskFormData) => {
    await onSubmitPatchData(data, pageParams.taskId);
  };
  const baseUrl = `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/`;
  const { data, error } = useFetchData<DateType>(
    `${baseUrl}${pageParams.taskId}`
  );
  if (error) {
    return <div>データが取得できませんでした。</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TitleInput />
        <ProjectSelect />
        <DescriptionTextarea />
        <StatusSelect />
        <TagSelect />
        <TaskSubmit />
      </form>
    </FormProvider>
  );
};

export default Index;

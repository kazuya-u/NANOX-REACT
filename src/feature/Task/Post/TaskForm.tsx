import { toast } from "react-toastify";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styled from "styled-components";
import { useGetOptionsData } from "../utils/TaskUtils";
import { TailSpin } from "react-loader-spinner";
import Select from "react-select";

type FormData = {
  title: string;
  description: string;
  project: {
    label: string;
    value: string;
  };
};

const TaskForm: React.FC = () => {
  const baseUrl =
    "http://drupal.sandbox.dev.lando/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name";
  const { datas } = useGetOptionsData(baseUrl);
  if (!datas) {
    <TailSpin />;
  }
  const options = datas;
  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("onSubmit:", data);
    const endpoint = "https:/drupal.sandbox.dev.lando/jsonapi/node/task";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
        body: JSON.stringify({
          data: {
            type: "node--task",
            attributes: {
              title: data.title,
              field_description: data.description,
            },
            relationships: {
              uid: {
                data: {
                  type: "user--user",
                  id: "570dfaca-8e38-4849-bb20-679c05c2488e",
                },
              },
              field_ref_project: {
                data: {
                  type: "taxonomy_term--project",
                  id: data.project.value,
                },
              },
            },
          },
        }),
      });
      const post = await res.json();
      console.log("Nodeが投稿されました。", res);

      return { post };
    } catch {
      console.error("Nodeの投稿に失敗しました。");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Add Task</Heading>
        <input type="text" {...register("title")} />
        <textarea {...register("description")} />
        <Controller
          control={control}
          name="project"
          render={({ field: { onChange } }) => (
            <Select
              onChange={onChange}
              isClearable
              isSearchable
              options={options}
              placeholder="Select an option"
            />
          )}
        />
        <button disabled={!isDirty || !isValid}>投稿する</button>
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  border: 1px solid #ccc;
  padding: 20px 20px 32px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export default TaskForm;

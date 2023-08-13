import { GetOptions, postData } from "../utils/Utils";
import { toast } from "react-toastify";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from "react-select";
import styled from "styled-components";

type FormData = {
  title: string;
  description: string;
  project: {
    label: string;
    value: string;
  };
  status: {
    label: string;
    value: string;
  };
};

type BodyDataType = {
  data: {
    type: string;
    attributes: {
      title: string;
      field_description: string;
    };
    relationships: {
      [key: string]: {
        data: RelatedData;
      };
    };
  };
};

type RelatedData = {
  type: string;
  id: string;
};

const onSubmit: SubmitHandler<FormData> = async (data) => {
  const endpoint = "https:/drupal.sandbox.dev.lando/jsonapi/node/task";
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  };
  const bodyData: BodyDataType = {
    data: {
      type: "node--task",
      attributes: {
        title: data.title,
        field_description: data.description,
      },
      relationships: {},
    },
  };

  const relatedData: RelatedData[] = [];
  if (data.project && data.project.value) {
    relatedData.push({
      type: "taxonomy_term--project",
      id: data.project.value,
    });
  }

  if (data.status && data.status.value) {
    relatedData.push({
      type: "taxonomy_term--status",
      id: data.status.value,
    });
  }

  relatedData.forEach((related) => {
    const relationshipKey = `field_ref_${related.type.split("--")[1]}`;
    bodyData.data.relationships[relationshipKey] = {
      data: related,
    };
  });
  try {
    await postData(endpoint, headers, bodyData);
    toast.success("Nodeの投稿に成功しました。");
  } catch (error) {
    console.error("Nodeの投稿に失敗しました。", error);
    toast.error("Nodeの投稿に失敗しました。");
  }
};

const TaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
  });

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
              options={GetOptions(
                "http://drupal.sandbox.dev.lando/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name"
              )}
              placeholder="Select an option"
            />
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange } }) => (
            <Select
              onChange={onChange}
              isClearable
              isSearchable
              options={GetOptions(
                "http://drupal.sandbox.dev.lando/jsonapi/taxonomy_term/status?fields[taxonomy_term--status]=name"
              )}
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

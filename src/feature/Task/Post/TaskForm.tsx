import { GetOptions, postData } from "../utils/Utils";
import { toast } from "react-toastify";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import styled from "styled-components";

const animatedComponents = makeAnimated();

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
  tags: RelatedData[];
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
  console.log("form", data);

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

  const generateRelatedData = (value: string, type: string): RelatedData => ({
    type,
    id: value,
  });
  if (data.tags && data.tags.length) {
    data.tags.forEach((tag) => {
      relatedData.push(generateRelatedData(tag.value, "taxonomy_term--tags"));
    });
  }

  relatedData.forEach((related) => {
    const relationshipKey = `field_ref_${related.type.split("--")[1]}`;
    bodyData.data.relationships[relationshipKey] = {
      data: related,
    };
  });
  console.log("bodyData", bodyData);

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
        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange } }) => (
            <CreatableSelect
              onChange={onChange}
              isClearable
              isMulti
              isSearchable
              components={animatedComponents}
              options={GetOptions(
                "http://drupal.sandbox.dev.lando/jsonapi/taxonomy_term/tags?fields[taxonomy_term--tags]=name"
              )}
              placeholder="タグを選択"
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
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export default TaskForm;

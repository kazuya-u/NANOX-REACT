import { Button, TextField } from "@mui/material";
import { GetOptions, postData } from "../utils/Utils";
import { toast } from "react-toastify";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import styled from "styled-components";
import Textarea from '@mui/joy/Textarea';

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

  try {
    await postData(endpoint, headers, bodyData);
    toast.success(`Nodeの投稿に成功しました。${data.title}`);
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
        <TextField id="standard-basic" label="Title" variant="standard" {...register("title")} />
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
              placeholder="Project"
            />
          )}
        />
        <Textarea {...register("description")} sx={{
          borderBottom: '2px solid',
          borderColor: 'neutral.outlinedBorder',
          borderRadius: '6px 6px 0 0',
          backgroundColor: 'inherit',
          '&:hover': {
            borderColor: 'neutral.outlinedHoverBorder',
          },
          '&::before': {
            border: '1px solid var(--Textarea-focusedHighlight)',
            transform: 'scaleX(0)',
            left: 0,
            right: 0,
            bottom: '-2px',
            top: 'unset',
            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
          },
          '&:focus-within::before': {
            transform: 'scaleX(1)',
          },
        }}
        placeholder="タスク内容" variant="outlined" minRows={2} />
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
              placeholder="Status"
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
              options={GetOptions(
                "http://drupal.sandbox.dev.lando/jsonapi/taxonomy_term/tags?fields[taxonomy_term--tags]=name"
              )}
              placeholder="Tag"
            />
          )}
        />
        <Button type="submit" disabled={!isDirty || !isValid} variant="contained" color="primary">送信する</Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export default TaskForm;

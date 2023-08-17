import React from "react";
import Select from "react-select";
import { GetOptions } from "../utils/Utils";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import CreatableSelect from "react-select";

export const TitleInput: React.FC = (
  () => {
    const { register } = useFormContext();
    return (
      <TextField
        {...register("title")}
        id="standard-basic"
        label="What is the Task's name..."
        variant="standard"
      />
    );
  }
);

export const ProjectSelect: React.FC = () => {
  const { control } = useForm();
  return (
    <Controller
          control={control}
          name="project"
          render={() => (
            <Select
            isClearable
            isSearchable
            // onChange={onChange}
            options={GetOptions(
              "http://drupal.sandbox.dev.lando/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name"
            )}
          />
          )}
        />
  )
}

export const StatusSelect: React.FC = () => {
  const { control } = useForm();
  return (
    <Controller
      control={control}
      name="status"
      render={() => (
        <Select
          isClearable
          isSearchable
          options={GetOptions(
            "http://drupal.sandbox.dev.lando/jsonapi/taxonomy_term/status?fields[taxonomy_term--status]=name"
          )}
          placeholder="Status"
        />
      )}
    />
  )
}

export const TagSelect: React.FC = () => {
  const { control } = useForm();
  return (
    <Controller
      control={control}
      name="tags"
      render={() => (
        <CreatableSelect
          // onChange={onChange}
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
  )
}

export const DescriptionTextarea: React.FC = (
  () => {
    const { register } = useFormContext();
    return (
      <TextField
        {...register("description")}
        id="standard-textarea"
        label="Detail..."
        minRows={2}
        multiline
        placeholder="Placeholder"
        variant="standard"
      />
    );
  }
);

export const TaskSubmit: React.FC = () => {
  return (
    <>
      <Button
        type="submit"
        // disabled={!(isDirty && isValid)}
        variant="contained"
        color="primary"
      >
        送信する
      </Button>
    </>
  )
}

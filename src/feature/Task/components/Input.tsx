import React from "react";
import Select from "react-select";
import { GetOptions } from "../utils/Utils";
import { Controller, useFormContext } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import CreatableSelect from "react-select";

interface TextInputProps {
  defaultValue?: string;
}

interface SelectInputProps {
  defaultValue?: {
    label: string,
    value: string,
  };
}

interface MultipleSelectInputProps {
  defaultValue?: SelectInputProps[];
}

export const TitleInput: React.FC<TextInputProps> = ({ defaultValue }) => {
  const { register } = useFormContext();
  return (
    <TextField
      {...register("title")}
      id="standard-basic"
      label="What is the Task's name..."
      variant="standard"
      defaultValue={defaultValue || ''}
    />
  );
}

export const ProjectSelect: React.FC<SelectInputProps> = ({ defaultValue }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="project"
      render={({ field: { onChange, value } }) => (
        <Select
          defaultValue={defaultValue}
          isSearchable
          onChange={onChange}
          value={value}
          options={GetOptions(
            `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name`
          )}
        />
      )}
    />
  )
}

export const StatusSelect: React.FC<SelectInputProps> = ({ defaultValue }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="status"
      render={({ field }) => (
        <Select
          {...field}
          defaultValue={defaultValue}
          isClearable
          isSearchable
          options={GetOptions(
            `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/taxonomy_term/status?fields[taxonomy_term--status]=name`
          )}
          placeholder="Status"
        />
      )}
    />
  )
}

export const TagSelect: React.FC<MultipleSelectInputProps> = ({ defaultValue }) => {
  console.log(defaultValue);

  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="tags"
      render={({ field }) => (
        <CreatableSelect
          {...field}
          defaultValue={defaultValue}
          isClearable
          isMulti
          isSearchable
          options={GetOptions(
            `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/taxonomy_term/tags?fields[taxonomy_term--tags]=name`
          )}
          placeholder="Tag"
        />
      )}
    />
  )
}

export const DescriptionTextarea: React.FC<TextInputProps> = (
  ({ defaultValue }) => {
    const { register } = useFormContext();
    return (
      <TextField
        {...register("description")}
        id="standard-multiline-static"
        label="Detail..."
        minRows={2}
        rows={4}
        multiline
        placeholder="Placeholder"
        variant="standard"
        defaultValue={defaultValue || ''}
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


import { BASE_API_URL } from "~utils/EndPoint";
import { Button, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { GetOptions } from "~feature/Task/api/GetData";
import CreatableSelect from "react-select";
import React from "react";
import Select from "react-select";

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
            `${BASE_API_URL}/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name`
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
            `${BASE_API_URL}/jsonapi/taxonomy_term/status?fields[taxonomy_term--status]=name`
          )}
          placeholder="Status"
        />
      )}
    />
  )
}

export const TagSelect: React.FC<MultipleSelectInputProps> = ({ defaultValue }) => {
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
            `${BASE_API_URL}/jsonapi/taxonomy_term/tags?fields[taxonomy_term--tags]=name`
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
        rows={4}
        multiline
        placeholder="Placeholder"
        variant="standard"
        defaultValue={defaultValue || ''}
      />
    );
  }
);

export const SubmitButton: React.FC = () => {
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

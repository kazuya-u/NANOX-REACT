import { BASE_API_URL } from "../../../utils/EndPoint";
import { Button, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { GetOptions } from "../../Task/api/GetData";
import CreatableSelect from "react-select";
import React from "react";
import Select from "react-select";

interface TextInputProps {
  defaultValue?: string;
  onChangeFunc?: (data: string) => void;
  value?: string;
}

type LabelValueType = {
  label: string;
  value: string;
}

interface SelectInputProps {
  defaultValue?: {
    label: string,
    value: string,
  };
  onChangeFunc?: (data: LabelValueType) => void;
}

interface MultipleSelectInputProps {
  defaultValue?: SelectInputProps[];
}

export const TitleInput: React.FC<TextInputProps> = ({ defaultValue, onChangeFunc }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="title"
      render={({ field: { onChange } }) => (
        <TextField
          id="standard-basic"
          label="What is the Task's name..."
          variant="standard"
          defaultValue={defaultValue || ''}
          onChange={onChangeFunc ? onChangeFunc : onChange}
        />
      )}
    />
  );
}

export const ProjectSelect: React.FC<SelectInputProps> = ({ defaultValue, onChangeFunc }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="project"
      render={({ field: { value, onChange } }) => (
        <Select
          defaultValue={defaultValue}
          isSearchable
          onChange={onChangeFunc ? onChangeFunc : onChange}
          value={value}
          options={GetOptions(
            `${BASE_API_URL}/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name`
          )}
        />
      )}
    />
  )
}

export const StatusSelect: React.FC<SelectInputProps> = ({ defaultValue, onChangeFunc }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="status"
      render={({ field: { value, onChange } }) => (
        <Select
          defaultValue={defaultValue}
          isSearchable
          onChange={onChangeFunc ? onChangeFunc : onChange}
          value={value}
          options={GetOptions(
            `${BASE_API_URL}/jsonapi/taxonomy_term/status?fields[taxonomy_term--status]=name`
          )}
        // placeholder="Status"
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
  ({ defaultValue, onChangeFunc }) => {
    const { control } = useFormContext();
    return (
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange } }) => (
          <TextField
            id="standard-multiline-static"
            label="Detail..."
            rows={4}
            multiline
            placeholder="Placeholder"
            variant="standard"
            defaultValue={defaultValue || ''}
            onChange={onChangeFunc ? onChangeFunc : onChange}
          />
        )}
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

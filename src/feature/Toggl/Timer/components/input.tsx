import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@mui/material";
import React from "react";

const TimerDescriptionInput: React.FC = () => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="description"
      render={({ field: { value, onBlur, onChange } }) => (
        <Input
          onBlur={onBlur}
          onChange={onChange}
          value={value}
        />
      )}
    />
  );
};

export default TimerDescriptionInput;

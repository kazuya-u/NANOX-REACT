import React from "react";
import { Path, useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

type ButtonDisabledProps = {
  disabled?: boolean
}

interface IFormValues {
  firstName: string;
  lastName: string;
  age: number;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};

const Input = ({ label, register, required }: InputProps) => (
  <>
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <InputField {...register(label, { required })} />
    </InputWrapper>
  </>
);

const Select = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label }, ref) => (
  <>
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <SelectWrapper name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </SelectWrapper>

    </InputWrapper>
  </>
));


const TaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm<IFormValues>({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const onSubmit: SubmitHandler<IFormValues> = data => {
    alert(JSON.stringify(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input label="firstName" register={register} required />
      <Input label="lastName" register={register} required />
      <Select label="Age" {...register("age")} />
      <SubmitButton type="submit" disabled={!isDirty || !isValid}>送信</SubmitButton>
    </Form >
  );
}


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

const InputWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  /* width: 100px; */
`;

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const SelectWrapper = styled.select`
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button<ButtonDisabledProps>`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ disabled }) => disabled ? '#f2f2f2' : '#333'};
`;

export default TaskForm;
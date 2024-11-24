import React from "react";
import { Input } from "antd";
import { Controller, FieldError } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  control: any;
  rules?: any;
  error?: FieldError;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  control,
  rules,
  error,
}) => {
  return (
    <div>
      <p>{label}</p>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input className="h-12" placeholder={placeholder} {...field} />
        )}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default FormInput;

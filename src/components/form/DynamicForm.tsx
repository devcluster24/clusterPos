/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form } from "antd";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import CheckboxField from "./CheckboxField";
import RadioField from "./RadioField";
import NumberField from "./NumberField";
import PasswordField from "./PasswordField";
import DateField from "./DateField";
import SubmitButton from "./SubmitButton";

export interface FormField {
  name: string;
  label: string;
  type:
    | "input"
    | "select"
    | "date"
    | "textarea"
    | "checkbox"
    | "radio"
    | "number"
    | "password";
  rules?: any[];
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface DynamicFormProps {
  formFields?: FormField[];
  children: React.ReactNode;
  onSubmit: (values: any) => void;
  loading?: boolean;
  submitLabel?: string;
  initialValues?: Record<string, any>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formFields,
  children,
  onSubmit,
  loading = false,
  submitLabel,
  initialValues = {},
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onSubmit}
      initialValues={initialValues}
      style={{ margin: 0, padding: 0 }}
    >
      {formFields &&
        formFields.map((field) => {
          switch (field.type) {
            case "input":
              return (
                <InputField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  rules={field.rules}
                />
              );
            case "password":
              return (
                <PasswordField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                  placeholder={field.placeholder}
                />
              );
            case "textarea":
              return (
                <TextAreaField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                  placeholder={field.placeholder}
                />
              );
            case "select":
              return (
                <SelectField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                  options={field.options!}
                  placeholder={field.placeholder}
                />
              );
            case "radio":
              return (
                <RadioField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                  options={field.options!}
                />
              );
            case "checkbox":
              return (
                <CheckboxField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                />
              );
            case "number":
              return (
                <NumberField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                  placeholder={field.placeholder}
                />
              );
            case "date":
              return (
                <DateField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                  placeholder={field.placeholder}
                />
              );
            default:
              return null;
          }
        })}
      {children} {/* Render any additional children provided */}
      {submitLabel && <SubmitButton loading={loading} label={submitLabel} />}
    </Form>
  );
};

export default DynamicForm;

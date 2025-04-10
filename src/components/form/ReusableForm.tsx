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
import { FormInstance, FormLayout } from "antd/es/form/Form";

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
    | "password"
    | "file";
  rules?: any[];
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface ReusableFormProps {
  form?: FormInstance;
  formFields?: FormField[];
  content: React.ReactNode;
  onSubmit?: (values: any) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void;
  loading?: boolean;
  submitLabel?: string;
  initialValues?: Record<string, any>;
  layout?: FormLayout;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  form,
  formFields,
  content,
  onSubmit,
  onValuesChange,
  loading = false,
  submitLabel,
  initialValues = {},
  layout = "horizontal",
}) => {
  const computedFormItemLayout =
    layout === "vertical"
      ? { labelCol: { span: 24 }, wrapperCol: { span: 24 } }
      : { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

  return (
    <Form
      form={form}
      layout={layout}
      labelCol={computedFormItemLayout.labelCol}
      wrapperCol={computedFormItemLayout.wrapperCol}
      onFinish={onSubmit}
      onValuesChange={onValuesChange}
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
      {content} {/* Render any additional children provided */}
      {submitLabel && <SubmitButton loading={loading} label={submitLabel} />}
    </Form>
  );
};

export default ReusableForm;

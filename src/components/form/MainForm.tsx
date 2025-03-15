/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Form as AntdForm, Input, Select, Checkbox, Button } from "antd";
import * as Yup from "yup";

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "select" | "checkbox";
  placeholder?: string;
  options?: { label: string; value: string }[];
}

interface MainFormProps {
  fields: FieldConfig[];
  validationSchema: Yup.ObjectSchema<any>;
  initialValues: Record<string, any>;
  onSubmit: (values: any) => void;
  submitLabel?: string;
}

const MainForm: React.FC<MainFormProps> = ({
  fields,
  validationSchema,
  initialValues,
  onSubmit,
  submitLabel = "Submit",
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
          {fields.map((field) => (
            <AntdForm.Item
              key={field.name}
              label={field.label}
              className="w-full"
            >
              <Field name={field.name}>
                {({ field: formikField }: any) => {
                  if (field.type === "select" && field.options) {
                    return (
                      <Select
                        {...formikField}
                        onChange={(value) => setFieldValue(field.name, value)}
                        className="w-full"
                      >
                        {field.options.map((option) => (
                          <Select.Option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    );
                  } else if (field.type === "checkbox") {
                    return (
                      <Checkbox {...formikField} checked={formikField.value}>
                        {field.label}
                      </Checkbox>
                    );
                  } else {
                    return (
                      <Input
                        {...formikField}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="p-2 rounded-lg border border-gray-300 w-full"
                      />
                    );
                  }
                }}
              </Field>
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-500 text-sm"
              />
            </AntdForm.Item>
          ))}

          <Button type="primary" htmlType="submit" className="w-full">
            {submitLabel}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MainForm;

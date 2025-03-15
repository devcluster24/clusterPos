/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select } from "antd";
import { Field, ErrorMessage } from "formik";

interface FormSelectProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({ name, label, options }) => {
  return (
    <Form.Item label={label} className="w-full">
      <Field name={name}>
        {({ field, form }: any) => (
          <Select
            {...field}
            onChange={(value) => form.setFieldValue(name, value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            {options.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </Form.Item>
  );
};

export default FormSelect;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import { Field, ErrorMessage } from "formik";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
}) => {
  return (
    <Form.Item label={label} className="w-full">
      <Field name={name}>
        {({ field }: any) => (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className="p-2 rounded-lg border border-gray-300 w-full"
          />
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

export default FormInput;

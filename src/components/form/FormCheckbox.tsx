/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Checkbox } from "antd";
import { Field, ErrorMessage } from "formik";

interface FormCheckboxProps {
  name: string;
  label: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label }) => {
  return (
    <Form.Item className="w-full">
      <Field name={name}>
        {({ field }: any) => (
          <Checkbox {...field} checked={field.value}>
            {label}
          </Checkbox>
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

export default FormCheckbox;

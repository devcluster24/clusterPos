/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";

interface InputFieldProps {
  name: string;
  label: string;
  rules?: any[];
  placeholder?: string;
  type?: string;
  onChange?: (value: any) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  rules,
  placeholder = `${label}`,
  onChange,
}) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    style={{ marginBottom: "0px", width: "100%" }}
    className="border-gray-300 dark:border-gray-700 p-4 mb-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <Input placeholder={placeholder} type="text" onChange={onChange} />
  </Form.Item>
);

export default InputField;

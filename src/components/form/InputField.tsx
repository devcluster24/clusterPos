/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";

interface InputFieldProps {
  name: string;
  label: string;
  rules?: any[];
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  rules,
  placeholder = `${label}`,
}) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    style={{ marginBottom: "0px" }}
  >
    <Input placeholder={placeholder} type="text" />
  </Form.Item>
);

export default InputField;

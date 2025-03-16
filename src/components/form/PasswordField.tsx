import { Form, Input } from "antd";

interface PasswordFieldProps {
  name: string;
  label: string;
  rules?: Array<{ required?: boolean; message?: string }>;
  placeholder?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
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
    <Input.Password placeholder={placeholder} />
  </Form.Item>
);

export default PasswordField;

import { Form, Input } from "antd";

interface TextAreaFieldProps {
  name: string;
  label: string;
  rules?: Array<{ required?: boolean; message?: string }>;
  placeholder?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
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
    <Input.TextArea rows={4} placeholder={placeholder} />
  </Form.Item>
);

export default TextAreaField;

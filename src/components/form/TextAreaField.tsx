import { Form, Input } from "antd";

interface TextAreaFieldProps {
  name: string;
  label: string;
  rules?: Array<{ required?: boolean; message?: string }>;
  placeholder?: string;
  row?: number;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  rules,
  placeholder = `${label}`,
  row = 2,
}) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    style={{ marginBottom: "0px", width: "100%" }}
  >
    <Input.TextArea rows={row} placeholder={placeholder} />
  </Form.Item>
);

export default TextAreaField;

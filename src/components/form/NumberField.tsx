import { Form, InputNumber } from "antd";

interface NumberFieldProps {
  name: string;
  label?: string;
  rules?: Array<{ required?: boolean; message?: string }>;
  placeholder?: string;
}

const NumberField: React.FC<NumberFieldProps> = ({
  name,
  label,
  rules,
  placeholder = `${label}`,
}) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    style={{ marginBottom: "0px", width: "100%" }}
  >
    <InputNumber style={{ width: "100%" }} placeholder={placeholder} />
  </Form.Item>
);

export default NumberField;

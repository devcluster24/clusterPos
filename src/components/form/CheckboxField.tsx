import { Form, Checkbox } from "antd";

interface CheckboxFieldProps {
  name: string;
  label: string;
  rules?: Array<{ required?: boolean; message?: string }>;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  rules,
}) => (
  <Form.Item
    name={name}
    valuePropName="checked"
    rules={rules}
    style={{ marginBottom: "0px", width: "100%" }}
  >
    <Checkbox>{label}</Checkbox>
  </Form.Item>
);

export default CheckboxField;

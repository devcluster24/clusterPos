import { Form, Radio } from "antd";

interface RadioFieldProps {
  name: string;
  label: string;
  rules?: Array<{ required?: boolean; message?: string }>;
  options: { value: string; label: string }[];
}

const RadioField: React.FC<RadioFieldProps> = ({
  name,
  label,
  rules,
  options,
}) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    style={{ marginBottom: "0px" }}
  >
    <Radio.Group>
      {options.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  </Form.Item>
);

export default RadioField;

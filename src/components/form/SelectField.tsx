// 📁 src/components/form/SelectField.tsx
import { Form, Select } from "antd";

interface SelectFieldProps {
  name: string;
  label: string;
  rules?: Array<{ required?: boolean; message?: string }>;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  rules,
  options,
  placeholder = `Select ${label}`,
}) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    style={{ marginBottom: "0px" }}
  >
    <Select options={options} placeholder={placeholder} />
  </Form.Item>
);

export default SelectField;

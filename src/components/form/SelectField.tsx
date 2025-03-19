import { Form, Select } from "antd";

interface SelectFieldProps {
  name: string;
  label: string;
  rules?: Array<{ required?: boolean; message?: string }>;
  options: { value: string; label: string }[];
  placeholder?: string;
  showSearch?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  rules,
  options,
  placeholder = `Select ${label}`,
  showSearch = false, // Default is false
}) => (
  <Form.Item
    label={label}
    name={name}
    rules={rules}
    style={{ marginBottom: "0px" }}
  >
    <Select
      showSearch={showSearch} // Enable search only if showSearch is true
      optionFilterProp={showSearch ? "label" : undefined} // Only filter if search is enabled
      options={options}
      placeholder={placeholder}
      filterOption={
        showSearch
          ? (input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase()) ?? false
          : false
      }
    />
  </Form.Item>
);

export default SelectField;

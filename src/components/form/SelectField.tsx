/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select } from "antd";
import { NoFormStyleProps } from "antd/es/form/context";
import { FormItemLayout } from "antd/es/form/Form";

interface SelectFieldProps {
  style?: NoFormStyleProps;
  layout?: FormItemLayout;
  name?: string;
  label?: string;
  rules?: Array<{ required?: boolean; message?: string }>;
  options: { value: string | number | boolean | null; label: string }[];
  placeholder?: string;
  showSearch?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  style,
  name,
  layout = "horizontal",
  label,
  rules,
  options,
  placeholder = `Select ${label}`,
  showSearch = false,
  value,
  onChange,
}) => (
  <Form.Item
    layout={layout}
    label={label}
    name={name}
    rules={rules}
    style={{ marginBottom: "0px", width: "100%", ...style }}
  >
    <Select
      showSearch={showSearch} // Enable search only if showSearch is true
      optionFilterProp={showSearch ? "label" : undefined} // Only filter if search is enabled
      options={options}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
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

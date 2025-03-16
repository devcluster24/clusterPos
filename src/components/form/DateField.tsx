/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, DatePicker } from "antd";

interface DateFieldProps {
  name: string;
  label: string;
  rules?: Array<{ [key: string]: any }>;
  placeholder?: string;
}

const DateField: React.FC<DateFieldProps> = ({
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
    <DatePicker style={{ width: "100%" }} placeholder={placeholder} />
  </Form.Item>
);

export default DateField;

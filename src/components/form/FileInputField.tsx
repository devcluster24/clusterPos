/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";

interface FileInputFieldProps {
  name: string;
  label: string;
  rules?: any[];
  placeholder?: string;
  type?: string;
}

const FileInputField: React.FC<FileInputFieldProps> = ({
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
    className="border-gray-300 dark:border-gray-700 p-4 mb-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white "
  >
    <Input placeholder={placeholder} type="file" />
  </Form.Item>
);

export default FileInputField;

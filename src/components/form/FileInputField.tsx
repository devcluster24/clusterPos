/* eslint-disable @typescript-eslint/no-explicit-any */
import { Upload, Form, Button, UploadFile, message } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";

interface FileUploadFieldProps {
  name: string;
  label?: string;
  type?: string;
  rules?: any[];
  multiple?: boolean;
  fileSize?: string;
  fileList?: UploadFile[];
  handleUpload?: (info: UploadChangeParam<UploadFile>) => void;
  handleRemove?: (file: UploadFile) => boolean;
  allowedExtensions?: string[];
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  name,
  label,
  type,
  rules = [],
  multiple = false,
  fileSize,
  fileList = [],
  handleUpload,
  handleRemove,
  allowedExtensions = ["jpg", "jpeg", "png", "pdf", "xlsx"],
}) => {
  const beforeUpload = (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!allowedExtensions.includes(fileExtension || "")) {
      message.error(
        `Invalid file type! Allowed: ${allowedExtensions.join(", ")}`
      );
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  return (
    <Form.Item
      style={{ marginBottom: "0px" }}
      name={name}
      label={
        <span>
          {label}{" "}
          {fileSize && <span className="text-red-500">(size: {fileSize})</span>}
        </span>
      }
      rules={rules}
    >
      {type ? (
        <Upload
          listType="picture"
          fileList={fileList}
          multiple={multiple}
          beforeUpload={beforeUpload}
          onChange={handleUpload}
          onRemove={handleRemove}
        >
          <Button type="primary" icon={<UploadOutlined />}>
            Select File to Import
          </Button>
        </Upload>
      ) : (
        <Upload
          listType="picture-card"
          fileList={fileList}
          multiple={multiple}
          beforeUpload={beforeUpload}
          onChange={handleUpload}
          onRemove={handleRemove}
        >
          {fileList.length < (multiple ? 5 : 1) && (
            <div className="flex flex-col items-center">
              <InboxOutlined className="text-3xl text-gray-500 mb-2" />
              <p className="text-gray-500">
                Drag and drop a file here or click
              </p>
            </div>
          )}
        </Upload>
      )}
    </Form.Item>
  );
};

export default FileUploadField;

import { Button, Form } from "antd";

interface SubmitButtonProps {
  label?: string;
  loading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label = "Submit",
  loading = false,
}) => {
  return (
    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        style={{ marginTop: "10px", marginLeft: "auto" }}
      >
        {label}
      </Button>
    </Form.Item>
  );
};

export default SubmitButton;

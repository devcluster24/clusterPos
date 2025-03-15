import { Button } from "antd";

interface FormButtonProps {
  label: string;
}

const FormButton: React.FC<FormButtonProps> = ({ label }) => {
  return (
    <Button type="primary" htmlType="submit" className="w-full">
      {label}
    </Button>
  );
};

export default FormButton;

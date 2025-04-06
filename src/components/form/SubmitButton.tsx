/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from "antd";
import { FaSpinner } from "react-icons/fa";

interface SubmitButtonProps {
  selectedRecord?: any;
  label?: string;
  loading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  selectedRecord,
  label = "Submit",
  loading = false,
}) => {
  console.log(loading);
  return (
    <Form.Item>
      <Button
        htmlType="submit"
        type="primary"
        disabled={loading}
        className="border transition ease-in-out bg-primary duration-300 border-primary shadow-2xl  text-[#ffff] text-sm font-semibold px-4 md:px-5 py-2 flex items-center gap-1 text-center disabled:opacity-80 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex justify-center items-center gap-3">
            {selectedRecord ? "Updating" : "Creating"}{" "}
            <FaSpinner className="animate-spin text-lg" />
          </span>
        ) : (
          <span>{label}</span>
        )}
      </Button>
    </Form.Item>
  );
};

export default SubmitButton;

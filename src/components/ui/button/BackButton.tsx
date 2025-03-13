import { useNavigate } from "react-router-dom";
import ReusableButton from "./ReusableButton";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <ReusableButton
      label="Back"
      type="primary"
      icon="back"
      onClick={() => navigate(-1)}
    />
  );
};

export default BackButton;

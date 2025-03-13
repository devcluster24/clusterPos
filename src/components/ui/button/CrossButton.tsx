import ReusableButton from "./ReusableButton";

interface CrossButtonProps {
  onClose: () => void;
}

const CrossButton: React.FC<CrossButtonProps> = ({ onClose }) => {
  return <ReusableButton icon="close" type="danger" onClick={onClose} />;
};

export default CrossButton;

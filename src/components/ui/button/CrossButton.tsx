import { useAppDispatch } from "@/redux/hooks";
import ReusableButton from "./ReusableButton";
import { resetGState } from "@/redux/features/state/stateSlice";

const CrossButton: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <ReusableButton
      icon="close"
      type="danger"
      onClick={() => dispatch(resetGState())}
    />
  );
};

export default CrossButton;

import { useNavigate } from "react-router-dom";
import ReusableButton from "./ReusableButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGState } from "@/redux/features/state/stateSlice";
import { RootState } from "@/redux/store";

const BackButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { activeTab, previousActiveTab } = useAppSelector(
    (state: RootState) => state.gState
  );

  const handleBack = () => {
    if (previousActiveTab) {
      dispatch(setGState({ activeTab: previousActiveTab }));
    } else {
      navigate(-1); // Go back in history if no previous tab is stored
    }
  };

  return (
    <ReusableButton
      label="Back"
      type="primary"
      icon="back"
      onClick={handleBack}
    />
  );
};

export default BackButton;

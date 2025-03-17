import { useNavigate } from "react-router-dom";
import ReusableButton from "./ReusableButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGState } from "@/redux/features/state/stateSlice";
import { RootState } from "@/redux/store";

const BackButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { activeTab, previousActiveTab, activePage } = useAppSelector(
    (state: RootState) => state.gState
  );

  const handleBack = () => {
    if (activePage) {
      dispatch(
        setGState({
          activePage: false,
        })
      );
    } else if (previousActiveTab) {
      dispatch(
        setGState({
          activeTab: previousActiveTab,
          previousActiveTab: "",
        })
      );
    } else if (activeTab) {
      dispatch(
        setGState({
          activeTab: "",
        })
      );
    } else {
      navigate(-1);
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  activeTab: string;
  previousActiveTab: string;
  activePage: boolean;
}

const initialState: State = {
  activeTab: "",
  previousActiveTab: "",
  activePage: false,
};

const stateSlice = createSlice({
  name: "gState",
  initialState,
  reducers: {
    setGState: (state, action: PayloadAction<Partial<State>>) => {
      if (
        action.payload.activeTab &&
        action.payload.activeTab !== state.activeTab
      ) {
        state.previousActiveTab = state.activeTab;
      }
      state.activeTab = action.payload.activeTab || state.activeTab;
      state.activePage = action.payload.activePage ?? state.activePage;
    },
    resetGState: () => {
      return initialState;
    },
  },
});

export const { setGState, resetGState } = stateSlice.actions;
export default stateSlice.reducer;

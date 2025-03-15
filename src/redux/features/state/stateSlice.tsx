import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  activeTab: string;
}

const initialState: State = {
  activeTab: "",
};

const stateSlice = createSlice({
  name: "gState",
  initialState,
  reducers: {
    setGState: (state, action: PayloadAction<Partial<State>>) => {
      return { ...state, ...action.payload };
    },
    resetGState: () => {
      return initialState;
    },
  },
});

export const { setGState, resetGState } = stateSlice.actions;
export default stateSlice.reducer;

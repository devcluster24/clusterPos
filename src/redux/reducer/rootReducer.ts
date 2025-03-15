import { baseApi } from "../api/baseApi";
import authReducer from "../features/user/userSlice";
import stateReducer from "../features/state/stateSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  gState: stateReducer,
};

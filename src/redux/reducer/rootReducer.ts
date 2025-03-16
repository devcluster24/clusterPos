import { baseApi } from "../api/baseApi";
import authReducer from "../features/auth/authSlice";
import stateReducer from "../features/state/stateSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer, // This gets persisted in `store.ts`
  gState: stateReducer,
};

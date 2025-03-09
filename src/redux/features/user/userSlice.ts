import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getCookie, setCookie, removeCookie } from "@/utils/cookieHelper";
import { authKey } from "@/constant/authkey";

export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: getCookie(authKey) || null, // Load token from cookies
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      setCookie(authKey, token); // Save token in cookies
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeCookie(authKey); // Remove token from cookies
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;

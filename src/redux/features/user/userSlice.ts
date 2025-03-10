import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getCookie, setCookie, removeCookie } from "@/utils/cookieHelper";
import { authKey } from "@/constant/authkey";
import { decodeToken, TUser } from "@/utils/tokenHelper";

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

// Get token from cookies
const storedToken = getCookie(authKey);
const storedUser = decodeToken(storedToken); // Decode user from token

const initialState: TAuthState = {
  user: storedUser,
  token: storedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      setCookie(authKey, token); // Store token in cookies
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

// Selectors
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;

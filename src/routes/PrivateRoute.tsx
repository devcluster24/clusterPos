import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { getCookie, removeCookie } from "@/utils/cookieHelper";
import { authKey } from "@/constant/authkey";
import { logout } from "@/redux/features/auth/authSlice";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token =
    useSelector((state: RootState) => state.auth.token) || getCookie(authKey);
  const location = useLocation();
  const dispatch = useAppDispatch();

  if (!token) {
    dispatch(logout());
    removeCookie(authKey);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;

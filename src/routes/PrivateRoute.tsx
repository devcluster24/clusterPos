import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { ReactNode } from "react";
import { logout } from "@/redux/features/user/userSlice";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector(
    (state: { user: { token: string } }) => state.user.token
  );
  const dispatch = useDispatch();
  const location = useLocation();

  if (!token) {
    dispatch(logout());
    return <Navigate to="/login" replace state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;

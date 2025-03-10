import { useEffect } from "react";
import { authKey } from "./constant/authkey";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getCookie } from "./utils/cookieHelper";
import { decodeToken } from "./utils/tokenHelper";
import { setUser } from "./redux/features/user/userSlice";
import AppLayout from "./components/layout/AppLayout";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = getCookie(authKey);

  useEffect(() => {
    if (!user && token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        dispatch(setUser({ user: decodedUser, token }));
      }
    }
  }, [user, token, dispatch]);

  return (
    <>
      <AppLayout />
    </>
  );
}

export default App;

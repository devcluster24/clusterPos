import { useEffect } from "react";
import RootLayout from "./components/layouts/RootLayout";
import { authKey } from "./constant/authkey";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getCookie } from "./utils/cookieHelper";
import { decodeToken } from "./utils/tokenHelper";
import { setUser } from "./redux/features/user/userSlice";

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
      <RootLayout />
    </>
  );
}

export default App;

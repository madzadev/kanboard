import { useRecoilState } from "recoil";
import { userState } from "../store/user";

import AuthWrapper from "../components/AuthWrapper";
import LogOut from "../components/LogOut";

const Boards = () => {
  const [user, setUser] = useRecoilState(userState);

  return (
    <AuthWrapper>
      <h1>Welcome, {user}!</h1>
    </AuthWrapper>
  );
};

export default Boards;

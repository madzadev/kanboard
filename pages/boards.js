import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";

import LogOut from "../components/LogOut";

const Boards = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  if (!user) {
    router.push("/");
  }
  return (
    <div>
      <h1>Welcome, {user}!</h1>
      <LogOut />
    </div>
  );
};

export default Boards;

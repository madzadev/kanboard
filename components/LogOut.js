import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";
import { api } from "../appwrite";

const LogOut = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const onClick = async () => {
    try {
      const login = await api.logout();
      setUser("");
      router.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <p>Hi!</p>
      <button onClick={onClick}>Log out</button>
    </div>
  );
};

export default LogOut;

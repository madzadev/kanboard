import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";
import { api } from "../appwrite";
import { useEffect } from "react";

import styles from "./LogOut.module.css";

const LogOut = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const onClick = async () => {
    try {
      const logout = await api.logout();
      setUser("");
      router.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={onClick}>
        Log out
      </button>
    </div>
  );
};

export default LogOut;

import { useRouter } from "next/router";
import { useEffect } from "react";
import LogIn from "../components/LogIn";

import styles from "../styles/Home.module.css";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  // useEffect(() => {
  //   if (user) {
  //     router.push("/boards");
  //   }
  // }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Appwrite Kanban</h1>
      <LogIn />
    </div>
  );
}

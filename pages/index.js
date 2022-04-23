import Link from "next/link";
import LogIn from "../components/LogIn";

import styles from "../styles/Home.module.css";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  return (
    <div className={styles.container}>
      {!user ? (
        <>
          <h1>Appwrite Kanban</h1>
          <LogIn />
        </>
      ) : (
        <h1>{user}</h1>
      )}
    </div>
  );
}

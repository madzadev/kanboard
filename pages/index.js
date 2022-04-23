import Link from "next/link";

import styles from "../styles/Home.module.css";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  return (
    <div className={styles.container}>
      <h1>Appwrite app</h1>
      <Link href="/signup">
        <h2>Sign Up</h2>
      </Link>
      <Link href="/login">
        <h2>Log In</h2>
      </Link>
      <h1>{user}</h1>
    </div>
  );
}

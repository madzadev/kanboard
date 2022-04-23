import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  return (
    <div className={styles.container}>
      <Head>
        <title>Appwrite CRUD</title>
        <meta name="description" content="Appwrite CRUD" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

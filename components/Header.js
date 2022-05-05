import Link from "next/link";
import LogOut from "./LogOut";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <Link href="/dashboard">
        <h2 className={styles.logo}>📃 KanBoard</h2>
      </Link>
      <LogOut />
    </div>
  );
};

export default Header;

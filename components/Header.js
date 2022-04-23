import LogOut from "./LogOut";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Logo</h2>
      <LogOut />
    </div>
  );
};

export default Header;

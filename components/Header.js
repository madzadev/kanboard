import LogOut from "./LogOut";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <h2>📃 TaskManager</h2>
      <LogOut />
    </div>
  );
};

export default Header;

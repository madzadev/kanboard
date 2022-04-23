import LogOut from "./LogOut";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <h1>My Kanban app</h1>
      <LogOut />
    </div>
  );
};

export default Header;

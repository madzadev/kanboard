import styles from "./SideBar.module.css";

const SideBar = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Trello servers</h1>
      <h3 className={styles.page}># Articles</h3>
      <h3 className={styles.page}># Goals</h3>
      <h3 className={styles.page}># Tech</h3>
      <h3 className={styles.page}># Books</h3>
      <h3 className={styles.page}># Movies</h3>
      <h2>+ Add new</h2>
    </div>
  );
};

export default SideBar;

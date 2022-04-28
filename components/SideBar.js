import { useState } from "react";
import Link from "next/link";

import AddBoardModal from "./AddBoardModal";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const [addBoardModalVisible, setAddBoardModalVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <AddBoardModal addBoardModalVisible={addBoardModalVisible} />
      <Link href="/dashboard">
        <h3 className={styles.page}>Dashboard</h3>
      </Link>
      {/* <h2 className={styles.title}>Dashboard</h2>
      <h2 className={styles.title}>Notifications</h2>
      <h2 className={styles.title}>Calendar</h2> */}
      <hr />
      <h2 className={styles.title}>Boards list</h2>
      <Link href="/board/articles">
        <h3 className={styles.page}># Articles</h3>
      </Link>
      <Link href="/board/goals">
        <h3 className={styles.page}># Goals</h3>
      </Link>
      <Link href="/board/tech">
        <h3 className={styles.page}># Tech</h3>
      </Link>
      <Link href="/board/books">
        <h3 className={styles.page}># Books</h3>
      </Link>
      <Link href="/board/movies">
        <h3 className={styles.page}># Movies</h3>
      </Link>

      {/* <h3 className={styles.page}># Goals</h3>
      <h3 className={styles.page}># Tech</h3>
      <h3 className={styles.page}># Books</h3>
      <h3 className={styles.page}># Movies</h3> */}
      <div
        className={styles.add}
        onClick={() => {
          setAddBoardModalVisible(!addBoardModalVisible);
        }}
      >
        + New server
      </div>
    </div>
  );
};

export default SideBar;

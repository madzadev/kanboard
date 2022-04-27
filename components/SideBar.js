import { useState } from "react";

import AddBoardModal from "./AddBoardModal";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const [addBoardModalVisible, setAddBoardModalVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <AddBoardModal addBoardModalVisible={addBoardModalVisible} />
      <h1 className={styles.title}>Trello servers</h1>
      <h3 className={styles.page}># Articles</h3>
      <h3 className={styles.page}># Goals</h3>
      <h3 className={styles.page}># Tech</h3>
      <h3 className={styles.page}># Books</h3>
      <h3 className={styles.page}># Movies</h3>
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

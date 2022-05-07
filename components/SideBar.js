import { useState, useEffect } from "react";
import Link from "next/link";
import urlSlug from "url-slug";
import { useRecoilState } from "recoil";
import { boardState } from "../store/board";

import AddBoardModal from "./AddBoardModal";

import { api } from "../appwrite";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const [addBoardModalVisible, setAddBoardModalVisible] = useState(false);
  const [activeBoard, setActiveBoard] = useRecoilState(boardState);
  const [boards, setBoards] = useState();

  useEffect(() => {
    const getBoards = async () => {
      try {
        const boards = await api.getBoards();
        setBoards(boards.documents);
        // router.push("/boards");
      } catch (err) {
        console.log(err.message);
      }
    };
    getBoards();
  }, []);

  return (
    <div className={styles.wrapper}>
      <AddBoardModal addBoardModalVisible={addBoardModalVisible} />
      <Link href="/dashboard">
        <h3 className={styles.page}>🏡 Dashboard</h3>
      </Link>
      <Link href="/calendar">
        <h3 className={styles.page}>📅 Calendar</h3>
      </Link>
      <Link href="/activities">
        <h3 className={styles.page} style={{ marginBottom: "50px" }}>
          ⌛ Activities
        </h3>
      </Link>
      {boards &&
        boards.map((board, index) => {
          return (
            <Link href={`/board/${urlSlug(board.title)}`} key={index}>
              <h3
                className={styles.page}
                onClick={() => {
                  setActiveBoard(board.$id);
                }}
              >
                # {board.title}
              </h3>
            </Link>
          );
        })}

      {/* <Link href="/board/goals">
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
      </Link> */}

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
        + New board
      </div>
    </div>
  );
};

export default SideBar;

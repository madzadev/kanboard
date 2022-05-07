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
    const getAllBoards = async () => {
      try {
        const boards = await api.getAllBoards();
        console.log(boards.documents);
        setBoards(boards.documents);
        // router.push("/boards");
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllBoards();
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

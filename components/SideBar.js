import { useState, useEffect } from "react";
import Link from "next/link";
import urlSlug from "url-slug";
import { useRecoilState } from "recoil";
import { boardState } from "../store/board";

import AddBoardModal from "./AddBoardModal";
import DeleteButton from "./DeleteButton";

import { api } from "../appwrite";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const [addBoardModalVisible, setAddBoardModalVisible] = useState(false);
  const [activeBoard, setActiveBoard] = useRecoilState(boardState);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const getAllBoards = async () => {
      try {
        const boards = await api.getAllBoards();
        for (const board of boards.documents) {
          const columns = await api.getColumnsInBoard(board.$id);
          board["columns"] = columns.total;
          setBoards((boards) => [...boards, board]);
        }
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
            <div className={styles.item} key={index}>
              <Link href={`/board/${urlSlug(board.title)}`}>
                <h3
                  className={styles.page}
                  onClick={() => {
                    setActiveBoard(board.$id);
                  }}
                >
                  # {board.title}
                </h3>
              </Link>
              {!board.columns && (
                <DeleteButton
                  onClick={() => {
                    api.deleteBoard(board.$id);
                    // router.reload(window.location.pathname);
                  }}
                />
              )}
            </div>
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

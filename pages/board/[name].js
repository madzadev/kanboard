import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../store/user";
import { boardState } from "../../store/board";
import urlSlug from "url-slug";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AuthWrapper from "../../components/AuthWrapper";
const TaskCard = dynamic(() => import("../../components/TaskCard"), {
  ssr: false,
});

import AddCardModal from "../../components/AddCardModal";
import ViewCardModal from "../../components/ViewCardModal";
import AddColumnModal from "../../components/AddColumnModal";
import DeleteColumnModal from "../../components/DeleteColumnModal";
import DeleteButton from "../../components/DeleteButton";

import Search from "../../components/Search";

import { api } from "../../appwrite";
import styles from "../../styles/Boards.module.css";

const Boards = () => {
  const [user, setUser] = useRecoilState(userState);
  const [columns, setColumns] = useState({});

  const [isBrowser, setIsBrowser] = useState(false);
  const [addCardModalVisible, setAddCardModalVisible] = useState(false);
  const [viewCardModalVisible, setViewCardModalVisible] = useState(false);
  const [addColumnModalVisible, setAddColumnModalVisible] = useState(false);
  const [deleteColumnModalVisible, setDeleteColumnModalVisible] =
    useState(false);

  const [activeCard, setActiveCard] = useState();
  const [activeColumn, setActiveColumn] = useState();
  const [activeBoard, setActiveBoard] = useRecoilState(boardState);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardDescription, setBoardDescription] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    if (!name) return;
    if (!activeBoard) {
      const getAllBoards = async () => {
        try {
          const boards = await api.getAllBoards();
          boards.documents.forEach((board, index) => {
            if (urlSlug(board.title) === name) {
              setActiveBoard(board.$id);
              setBoardTitle(board.title);
              setBoardDescription(board.description);
            }
          });
        } catch (err) {
          console.log(err.message);
        }
      };
      getAllBoards();
    }
  }, [name]);

  useEffect(() => {
    if (activeColumn) {
      columns[activeColumn].items.forEach(async (item, index) => {
        item.column_id = activeColumn;
        item.pos_index = index;
        await api.updatePost(item.$id, item);
      });
    }
  }, [columns]);

  useEffect(() => {
    setIsBrowser(process.browser);

    const getBoardData = async () => {
      try {
        const board = await api.getBoard(activeBoard);
        setBoardTitle(board.title);
        setBoardDescription(board.description);
      } catch (err) {
        console.log(err.message);
      }
    };

    getBoardData();

    let data = {};
    const getColumns = async () => {
      try {
        const columns = await api.getColumnsInBoard(activeBoard);
        for (const column of columns.documents) {
          const posts = await api.getAllPosts();
          const tasks = [];
          for (const post of posts.documents) {
            if (column.$id == post.column_id) {
              tasks.push(post);
            }
          }
          tasks.sort((a, b) => a.pos_index - b.pos_index);
          data[column.$id] = { title: column.title, items: tasks };
        }
        setColumns(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getColumns();
  }, [activeBoard]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
    setActiveColumn(destination.droppableId);
  };
  return (
    <AuthWrapper>
      <AddCardModal
        addCardModalVisible={addCardModalVisible}
        activeColumn={activeColumn}
      />
      <ViewCardModal
        viewCardModalVisible={viewCardModalVisible}
        activeCard={activeCard}
      />
      <AddColumnModal addColumnModalVisible={addColumnModalVisible} />
      <DeleteColumnModal
        deleteColumnModalVisible={deleteColumnModalVisible}
        activeColumn={activeColumn}
      />
      <div className={styles.header}>
        <div className={styles.name}>
          <h2>{boardTitle}</h2>
          <p>{boardDescription}</p>
        </div>
        <Search
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>

      {isBrowser && columns ? (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div className={styles.wrapper}>
            <div className={styles.column}>
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <Droppable key={columnId} droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        className={styles.list}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className={styles.head}>
                          <p className={styles.title}>{column.title}</p>
                          <p>{column.items.length}</p>
                          {!column.items.length && (
                            <DeleteButton
                              onClick={() => {
                                setActiveColumn(columnId);
                                setDeleteColumnModalVisible(
                                  !deleteColumnModalVisible
                                );
                              }}
                            />
                          )}
                        </div>
                        <div
                          className={styles.add}
                          onClick={() => {
                            setAddCardModalVisible(!addCardModalVisible);
                            setActiveColumn(columnId);
                          }}
                        >
                          + Add a card
                        </div>
                        <div className={styles.cardsWrapper}>
                          {column.items
                            .filter((item) =>
                              item.title
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            )
                            .map((item, index) => {
                              return (
                                <TaskCard
                                  key={item.$id}
                                  item={item}
                                  index={index}
                                  onClick={() => {
                                    setActiveCard(item.$id);
                                    setViewCardModalVisible(
                                      !viewCardModalVisible
                                    );
                                  }}
                                />
                              );
                            })}
                        </div>

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
              <p
                className={styles.new}
                onClick={() => {
                  setAddColumnModalVisible(!addColumnModalVisible);
                }}
              >
                + Add column
              </p>
            </div>
          </div>
        </DragDropContext>
      ) : null}
    </AuthWrapper>
  );
};

export default Boards;

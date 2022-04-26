// import { useRecoilState } from "recoil";
// import { userState } from "../store/user";

// import AuthWrapper from "../components/AuthWrapper";
// import LogOut from "../components/LogOut";

// const Boards = () => {
//   const [user, setUser] = useRecoilState(userState);

//   return (
//     <AuthWrapper>
//       <h1>Welcome, {user}!</h1>
//     </AuthWrapper>
//   );
// };

// export default Boards;

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AuthWrapper from "../components/AuthWrapper";
const TaskCard = dynamic(() => import("../components/TaskCard"), {
  ssr: false,
});

import EditModal from "../components/EditModal";

import { api } from "../appwrite";
// import { columns1 } from "../data/kanban";
import styles from "../styles/Boards.module.css";

const Boards = () => {
  const [user, setUser] = useRecoilState(userState);
  const [columns, setColumns] = useState({});

  const [isBrowser, setIsBrowser] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeColumn, setActiveColumn] = useState();

  useEffect(() => {
    // console.log(columns);
  }, [columns]);

  useEffect(() => {
    setIsBrowser(process.browser);

    let data = {};
    const getColumns = async () => {
      try {
        const columns = await api.fetchColumns();
        for (const column of columns.documents) {
          const posts = await api.fetchPosts();
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
  }, []);

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
    // console.log(destination.droppableId); //right one to update to (column id)
    // console.log(result.draggableId); //task id
    // console.log(result);
    const updatePost = async () => {
      try {
        // console.log(destination);
        const fetchPostById = await api.fetchPostById(result.draggableId);
        fetchPostById.column_id = destination.droppableId;
        fetchPostById.pos_index = destination.index;
        // console.log(destination.droppableId);

        // get target column items
        const targetColumn = columns[destination.droppableId].items;
        const targetPosition = destination.index;
        console.log(targetColumn);

        await api.updatePost(result.draggableId, fetchPostById);
      } catch (err) {
        console.log(err.message);
      }
    };
    updatePost();
  };
  return (
    <AuthWrapper>
      <EditModal
        editModalVisible={editModalVisible}
        activeColumn={activeColumn}
      />
      {isBrowser && columns ? (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div className={styles.wrapper}>
            <div className={styles.column}>
              {Object.entries(columns).map(([columnId, column], index) => {
                // console.log(columns);
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
                        </div>
                        <div
                          className={styles.add}
                          onClick={() => {
                            // console.log(`The column id is: ${columnId}`);
                            setEditModalVisible(!editModalVisible);
                            setActiveColumn(columnId);
                          }}
                        >
                          + Add a card
                        </div>
                        {column.items.map((item, index) => {
                          return (
                            <TaskCard
                              key={item.$id}
                              item={item}
                              index={index}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          </div>
        </DragDropContext>
      ) : null}
    </AuthWrapper>
  );
};

export default Boards;

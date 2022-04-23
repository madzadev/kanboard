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

import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";

import AuthWrapper from "../components/AuthWrapper";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { columns1 } from "../data/kanban";
import TaskCard from "../components/TaskCard";

import styles from "../styles/Boards.module.css";

const Boards = () => {
  const [user, setUser] = useRecoilState(userState);
  const [columns, setColumns] = useState(columns1);

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
  };
  return (
    <AuthWrapper>
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
                      <div className={styles.title}>{column.title}</div>
                      {column.items.map((item, index) => (
                        <TaskCard key={item} item={item} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>
      </DragDropContext>
    </AuthWrapper>
  );
};

export default Boards;

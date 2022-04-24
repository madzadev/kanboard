import dynamic from "next/dynamic";
import { useState } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { columns1 } from "../data/kanban";

const TaskCard = dynamic(() => import("./TaskCard"), {
  ssr: false,
});

import styles from "./Kanban.module.css";

const Kanban = () => {
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
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className={styles.wrapper}>
        <div className={styles.column}>
          {Object.entries(columns).map(([columnId, column], index) => {
            // console.log(columnId, column, index);
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    className={styles.list}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className={styles.title}>{column.title}</div>
                    {column.items.map((item, index) => {
                      console.log(item, index);
                      return (
                        <TaskCard pass={item.id} item={item} index={index} />
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
  );
};

export default Kanban;

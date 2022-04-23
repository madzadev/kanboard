import { Draggable } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
// const { Draggable } = dynamic(() => import("react-beautiful-dnd"), {
//   ssr: false,
// });
import styles from "./TaskCard.module.css";

const TaskCard = ({ item, index }) => {
  return (
    <Draggable draggableId={item} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.wrapper}>
            <p>{item.Task}</p>
            <div className={styles.details}>
              <p>
                <span>
                  {new Date(item.Due_Date).toLocaleDateString("en-us", {
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;

import { Draggable, resetServerContext } from "react-beautiful-dnd";
import styles from "./TaskCard.module.css";

const TaskCard = ({ key, item, index, data }) => {
  return (
    <Draggable key={key} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.wrapper}
        >
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
      )}
    </Draggable>
  );
};

export async function getServerSideProps(context) {
  resetServerContext();
  return { props: { data: [] } };
}

export default TaskCard;

import { Draggable, resetServerContext } from "react-beautiful-dnd";
import styles from "./TaskCard.module.css";

const TaskCard = ({ key, item, index }) => {
  return (
    <Draggable key={key} draggableId={item.$id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.wrapper}
        >
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>
          <div className={styles.date}>
            <p>
              <span>
                {new Date(item.due_date).toLocaleDateString("en-us", {
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

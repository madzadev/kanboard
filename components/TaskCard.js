import { useState, useEffect } from "react";
import { Draggable, resetServerContext } from "react-beautiful-dnd";
import styles from "./TaskCard.module.css";
import { api } from "../appwrite";

const TaskCard = ({ key, item, index }) => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (activeCard) {
      const onSubmit = async () => {
        try {
          const cardData = await api.fetchPostById(activeCard);

          setUser($id);
          router.push("/dashboard");
        } catch (err) {
          console.log(err.message);
        }
      };
    }
  }, [activeCard]);

  return (
    <Draggable key={key} draggableId={item.$id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.wrapper}
          onClick={() => {
            setActiveCard(item.$id);
          }}
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

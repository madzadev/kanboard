import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import dayjs from "dayjs";
import { api } from "../appwrite";

import styles from "./TaskCard.module.css";

const TaskCard = ({ key, item, index, onClick }) => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (activeCard) {
      const onSubmit = async () => {
        try {
          const cardData = await api.getPost(activeCard);

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
          onClick={onClick}
        >
          <h3 className={styles.title}>{item.title.slice(0, 25)}</h3>
          <p className={styles.description}>{item.description.slice(0, 70)}</p>

          <div className={styles.date}>
            <p>
              <span>
                {item.due_date ? dayjs(item.due_date).format("DD MMM") : ""}
              </span>
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;

import styles from "./UpcomingTaskCard.module.css";

const UpcomingTaskCard = ({ task, time }) => {
  return (
    <div className={styles.wrapper}>
      <h3>{task}</h3>
      <p>{time}</p>
    </div>
  );
};

export default UpcomingTaskCard;

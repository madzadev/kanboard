import styles from "./UpcomingTaskCard.module.css";

const UpcomingTaskCard = ({ task, time }) => {
  return (
    <div className={styles.wrapper}>
      <h3>Read a book about whales</h3>
      <p>In 2 days</p>
    </div>
  );
};

export default UpcomingTaskCard;

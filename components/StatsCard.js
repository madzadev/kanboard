import styles from "./StatsCard.module.css";

const StatsCard = ({ score, title }) => {
  return (
    <div className={styles.wrapper}>
      <h1>{score}</h1>
      <p>{title}</p>
    </div>
  );
};

export default StatsCard;

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import styles from "./UpcomingTaskCard.module.css";

dayjs.extend(relativeTime);

const UpcomingTaskCard = ({ task, time }) => {
  return (
    <div className={styles.wrapper}>
      <h3>{task}</h3>
      <p>{dayjs(time).fromNow()}</p>
    </div>
  );
};

export default UpcomingTaskCard;

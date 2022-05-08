import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import styles from "./RecentActivityCard.module.css";

dayjs.extend(relativeTime);

const RecentActivityCard = ({ title, type, action, time }) => {
  return (
    <div
      className={`${styles.wrapper} ${
        action == 1
          ? styles.add
          : action == 2 || action == 3
          ? styles.edit
          : styles.delete
      }`}
    >
      <h3>
        You{" "}
        {action == 1
          ? "created"
          : action == 2
          ? "edited"
          : action == 3
          ? "moved"
          : "deleted"}
        {" a "}
        {type == 1 ? "board" : type == 2 ? "column" : "card"} "{title}"
      </h3>
      <p>{dayjs(time).fromNow()}</p>
    </div>
  );
};

export default RecentActivityCard;

import AuthWrapper from "../components/AuthWrapper";

import styles from "../styles/Calendar.module.css";

const Calendar = () => {
  return (
    <AuthWrapper>
      <h1 className={styles.header}>My calendar</h1>
    </AuthWrapper>
  );
};

export default Calendar;

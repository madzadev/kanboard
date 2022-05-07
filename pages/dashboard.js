import AuthWrapper from "../components/AuthWrapper";
import StatsCard from "../components/StatsCard";

import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  return (
    <AuthWrapper>
      <div className={styles.wrapper}>
        <div>
          <h1 className={styles.header}>My overview</h1>
          <div className={styles.stats}>
            <StatsCard score={3} title="Total boards" />
            <StatsCard score={3} title="Total columns" />
            <StatsCard score={12} title="Total tasks" />
          </div>
        </div>
        <div>
          <h1 className={styles.header}>Upcoming tasks</h1>
        </div>
      </div>

      <h1 className={styles.header}>Recent activity</h1>
    </AuthWrapper>
  );
};

export default Dashboard;

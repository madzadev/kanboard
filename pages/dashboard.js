import AuthWrapper from "../components/AuthWrapper";
import StatsCard from "../components/StatsCard";

import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  return (
    <AuthWrapper>
      <h1 className={styles.header}>My overview</h1>
      <div className={styles.stats}>
        <StatsCard score={3} title="Total boards" />
        <StatsCard score={3} title="Total columns" />
        <StatsCard score={12} title="Total tasks" />
        <StatsCard score={12} title="Total users" />
      </div>

      <h3>Calendar</h3>
      <h3>Recent activity</h3>
      <h3>Upcoming tasks</h3>
    </AuthWrapper>
  );
};

export default Dashboard;

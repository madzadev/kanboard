import { useState, useEffect } from "react";

import AuthWrapper from "../components/AuthWrapper";
import StatsCard from "../components/StatsCard";

import { api } from "../appwrite";

import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [totalBoards, setTotalBoards] = useState(0);
  const [totalColumns, setTotalColumns] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const getStats = async () => {
      try {
        const boards = await api.getAllBoards();
        setTotalBoards(boards.documents.length);
        const columns = await api.getAllColumns();
        setTotalColumns(columns.documents.length);
        const posts = await api.getAllPosts();
        setTotalPosts(posts.documents.length);
      } catch (err) {
        console.log(err.message);
      }
    };
    getStats();
  }, []);

  return (
    <AuthWrapper>
      <div className={styles.wrapper}>
        <div>
          <h1 className={styles.header}>My overview</h1>
          <div className={styles.stats}>
            <StatsCard score={totalBoards} title="Total boards" />
            <StatsCard score={totalColumns} title="Total columns" />
            <StatsCard score={totalPosts} title="Total tasks" />
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

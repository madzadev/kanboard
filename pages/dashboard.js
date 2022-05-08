import { useState, useEffect } from "react";

import AuthWrapper from "../components/AuthWrapper";
import StatsCard from "../components/StatsCard";
import UpcomingTaskCard from "../components/UpcomingTaskCard";
import PreviousTaskCard from "../components/PreviousTaskCard";

import { api } from "../appwrite";

import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [totalBoards, setTotalBoards] = useState([]);
  const [totalColumns, setTotalColumns] = useState([]);
  const [totalPosts, setTotalPosts] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const boards = await api.getAllBoards();
        setTotalBoards(boards.documents);
        const columns = await api.getAllColumns();
        setTotalColumns(columns.documents);
        const posts = await api.getAllPosts();
        setTotalPosts(posts.documents);
        console.log(posts.documents);
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
          <h1 className={styles.header}>⭐ My overview</h1>
          <div className={styles.stats}>
            <StatsCard score={totalBoards.length} title="Total boards" />
            <StatsCard score={totalColumns.length} title="Total columns" />
            <StatsCard score={totalPosts.length} title="Total tasks" />
          </div>
          <h1 className={styles.header}>Recent activity</h1>
        </div>
        <div>
          <h1 className={styles.header}>🚀 Upcoming tasks</h1>
          {totalPosts
            .filter((a) => a.due_date)
            .filter((a) => new Date() < new Date(a.due_date))
            .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
            .slice(0, 4)
            .map((post, index) => {
              return (
                <UpcomingTaskCard
                  key={index}
                  task={post.title}
                  time={post.due_date}
                />
              );
            })}
          <h1 className={styles.header}>✅ Previous tasks</h1>
          {totalPosts
            .filter((a) => a.due_date)
            .filter((a) => new Date() > new Date(a.due_date))
            .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
            .slice(0, 4)
            .map((post, index) => {
              return (
                <PreviousTaskCard
                  key={index}
                  task={post.title}
                  time={post.due_date}
                />
              );
            })}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Dashboard;

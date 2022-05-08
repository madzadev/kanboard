import { useState, useEffect } from "react";

import AuthWrapper from "../components/AuthWrapper";
import RecentActivityCard from "../components/RecentActivityCard";

import { api } from "../appwrite";
import styles from "../styles/Activities.module.css";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const activities = await api.getAllActivities();
        setActivities(activities.documents);
      } catch (err) {
        console.log(err.message);
      }
    };
    getActivities();
  }, []);
  return (
    <AuthWrapper>
      <h1 className={styles.header}>My activities</h1>
      <div className={styles.wrapper}>
        <div>
          <h2 className={styles.title}>Added actions</h2>
          {activities
            .filter((a) => a.action == 1)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 8)
            .map((activity, index) => {
              return (
                <RecentActivityCard
                  key={index}
                  type={activity.type}
                  title={activity.title}
                  time={activity.timestamp}
                  action={activity.action}
                />
              );
            })}
        </div>
        <div>
          <h2 className={styles.title}>Edited actions</h2>
          {activities
            .filter((a) => a.action == 2 || a.action == 3)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 8)
            .map((activity, index) => {
              return (
                <RecentActivityCard
                  key={index}
                  type={activity.type}
                  title={activity.title}
                  time={activity.timestamp}
                  action={activity.action}
                />
              );
            })}
        </div>
        <div>
          <h2 className={styles.title}>Deleted actions</h2>
          {activities
            .filter((a) => a.action == 4)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 8)
            .map((activity, index) => {
              return (
                <RecentActivityCard
                  key={index}
                  type={activity.type}
                  title={activity.title}
                  time={activity.timestamp}
                  action={activity.action}
                />
              );
            })}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Activities;

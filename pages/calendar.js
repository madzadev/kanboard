import { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import AuthWrapper from "../components/AuthWrapper";

import styles from "../styles/Calendar.module.css";
import dayGridPlugin from "@fullcalendar/daygrid";

import { api } from "../appwrite";

const Calendar = () => {
  const [events, setEvents] = useState();
  useEffect(() => {
    const getPosts = async () => {
      try {
        let data = [];
        const posts = await api.fetchPosts();
        posts.documents.forEach((post, index) => {
          data.push({ title: post.title, date: post.due_date });
        });
        setEvents(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getPosts();
  }, []);
  return (
    <AuthWrapper>
      <h1 className={styles.header}>My calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </AuthWrapper>
  );
};

export default Calendar;

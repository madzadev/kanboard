import { useState, useEffect } from "react";

import AuthWrapper from "../components/AuthWrapper";

import { api } from "../appwrite";
import styles from "../styles/Activities.module.css";

const Activities = () => {
  useEffect(() => {
    const getPosts = async () => {
      try {
        console.log("Some fetch activity");
      } catch (err) {
        console.log(err.message);
      }
    };
    getPosts();
  }, []);
  return (
    <AuthWrapper>
      <h1 className={styles.header}>My activities</h1>
      <div className={styles.wrapper}>
        <div>
          <h2>Added actions</h2>
        </div>
        <div>
          <h2>Edited actions</h2>
        </div>
        <div>
          <h2>Deleted actions</h2>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Activities;

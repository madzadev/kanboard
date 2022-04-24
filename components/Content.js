import styles from "./Content.module.css";

const Content = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Content;

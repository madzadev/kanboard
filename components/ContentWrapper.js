import styles from "./ContentWrapper.module.css";

const ContentWrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default ContentWrapper;

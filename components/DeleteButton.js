import styles from "./DeleteButton.module.css";

const DeleteButton = ({ onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <p>🗑️</p>
    </div>
  );
};

export default DeleteButton;

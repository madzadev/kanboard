import styles from "./EditButton.module.css";

const EditButton = ({ onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <p>✏️</p>
    </div>
  );
};

export default EditButton;

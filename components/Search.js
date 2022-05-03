import styles from "./Search.module.css";

const Search = () => {
  return (
    <div>
      <input
        className={styles.input}
        type="text"
        placeholder="Search card by title"
      />
    </div>
  );
};

export default Search;

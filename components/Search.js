import styles from "./Search.module.css";

const Search = ({ onChange }) => {
  return (
    <div>
      <input
        className={styles.input}
        type="text"
        placeholder="Search card by title"
        onChange={onChange}
      />
    </div>
  );
};

export default Search;

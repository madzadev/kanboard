import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <h3>
        Made with 💖 by{" "}
        <span>
          <a href="https://github.com/madzadev">Madza</a>
        </span>
      </h3>
      <p>
        Powered by{" "}
        <span>
          <a href="https://appwrite.io">Appwrite</a>
        </span>
      </p>
    </div>
  );
};

export default Footer;

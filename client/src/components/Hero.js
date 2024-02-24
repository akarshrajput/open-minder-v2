import styles from "./Hero.module.css";

function Hero() {
  return (
    <div className={styles.hero}>
      <p className={styles.quote}>Beyond Boundaries</p>
      <p className={styles.quotePara}>
        Stories, Thinking, and Expertise from Every Corner
      </p>
      <p className={styles.langInfo}>
        <span>English Newsletter</span>
      </p>
      <button className={styles.button}>Start Reading</button>
    </div>
  );
}
export default Hero;

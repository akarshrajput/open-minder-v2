import styles from "./Footer.module.css";
import { Copyright } from "phosphor-react";

function Footer() {
  const date = new Date().getFullYear();
  console.log(date);
  return (
    <div className={styles.footer}>
      <div className={styles.copyrightContainer}>
        <p>
          <span className={styles.button}>Read More about Minder</span>
        </p>
        <p>akarshrajput.01@gmail.com</p>
        <p className={styles.copyright}>
          Copyright <Copyright size={14} /> <span>Open Minder</span>
          {date}
        </p>
      </div>

      <div className={styles.fContent}>
        <p>Privacy Policy</p>
        <p>Speech Rights</p>
        <p>Help!</p>
        <p>Blog</p>
        <p>Service</p>
        <p>Contact</p>
      </div>
    </div>
  );
}

export default Footer;

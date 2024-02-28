import styles from "./Footer.module.css";
import { Copyright } from "phosphor-react";

function Footer() {
  const date = new Date().getFullYear();
  console.log(date);
  return (
    <div className={styles.footer}>
      <div className={styles.copyrightContainer}>
        <p className={styles.copyright}>
          Copyright <Copyright size={14} /> <span>Open Minder</span>
          {date}
        </p>
        {/* <p>Open Minder - Open Source data</p>
        <p>
          For more info - <span className={styles.button}>Read More</span>
        </p> */}
        {/* <p>Contact - akarshrajput.01@gmail.com</p> */}
      </div>
      {/* <div className={styles.fContent}>
        <p>Terms and Conditions</p>
        <p>Privacy Policy</p>
        <p>Speech Rights</p>
        <p>Complaint Request</p>
      </div>
      <div className={styles.fContent}>
        <p>User</p>
        <p>Blog</p>
        <p>Service</p>
        <p>Contact us</p>
      </div> */}
    </div>
  );
}

export default Footer;

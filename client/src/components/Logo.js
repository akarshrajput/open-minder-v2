import styles from "./Logo.module.css";
import img from "./../img/open-minder.png";

function Logo() {
  return (
    <div className={styles.logo}>
      <img src={img} alt="Open Minder Logo" />
      Open Minder
    </div>
  );
}
export default Logo;

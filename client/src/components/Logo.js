import styles from "./Logo.module.css";
import img from "./../img/op.png";

function Logo() {
  return (
    <div className={styles.logo}>
      <img src={img} alt="Open Minder Logo" />
    </div>
  );
}
export default Logo;

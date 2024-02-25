import styles from "./UserNav.module.css";
import { Translate } from "phosphor-react";
import { SunDim } from "phosphor-react";

function UserNav() {
  return (
    <div className={styles.userNav}>
      <p className={styles.navlink}>
        Speech
        <Translate size={14} weight="bold" />
      </p>
      <p className={styles.navCir}>
        <SunDim size={18} weight="bold" />
      </p>
      <p className={styles.special1}>Sign Up</p>
      <p className={styles.special2}>Sign In</p>
    </div>
  );
}

export default UserNav;

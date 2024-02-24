import styles from "./UserNav.module.css";
import { Newspaper, Translate, ShieldCheck, Bell } from "phosphor-react";

function UserNav() {
  return (
    <div className={styles.userNav}>
      <p className={styles.navlink}>
        Speech
        <Translate size={14} weight="bold" />
      </p>
      <p className={styles.navlink}>
        Security
        <ShieldCheck size={14} weight="bold" />
      </p>
      <p className={styles.navlink}>
        Paper
        <Newspaper size={14} weight="bold" />
      </p>
      <p className={styles.navlink}>
        Notifier
        <Bell size={14} weight="bold" />
      </p>
      <p className={styles.special1}>Sign Up</p>
      <p className={styles.special2}>Sign In</p>
    </div>
  );
}

export default UserNav;

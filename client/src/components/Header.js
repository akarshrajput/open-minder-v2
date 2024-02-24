import Search from "./Search";
import Logo from "./Logo";
import UserNav from "./UserNav";
import styles from "./Header.module.css";
import { X } from "phosphor-react";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.popup}>
        <p className={styles.cont}>
          Open Minder 2.0 | Read our new updated features and security Privacy
          and Policies - <span className={styles.link}>Read Here</span>
        </p>
        <X className={styles.removePopup} size={20} weight="bold" />
      </div>
      <div className={styles.flexCon}>
        <div className={styles.subHeader}>
          <Logo />
          <Search />
        </div>
        <UserNav />
      </div>
    </div>
  );
}

export default Header;

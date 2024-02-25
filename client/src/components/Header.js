import Search from "./Search";
import Logo from "./Logo";
import UserNav from "./UserNav";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
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

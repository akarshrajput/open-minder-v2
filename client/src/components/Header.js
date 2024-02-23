import Search from "./Search";
import Logo from "./Logo";
import UserNav from "./UserNav";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.subHeader}>
        <Logo />
        <Search />
      </div>
      <UserNav />
    </div>
  );
}

export default Header;

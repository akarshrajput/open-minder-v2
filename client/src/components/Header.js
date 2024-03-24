import Search from "./Search";
import Logo from "./Logo";
import UserNav from "./UserNav";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
function Header({ bg = "#fff" }) {
  const { isLoading } = useAuth();

  const [scrollY, setScrollBg] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 340) {
        setScrollBg(true);
      } else {
        setScrollBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const col = scrollY ? "#fff" : bg;
  return (
    <div className={styles.header} style={{ backgroundColor: col }}>
      <div className={styles.flexCon}>
        <div className={styles.subHeader}>
          <Logo />
          <Search />
        </div>
        {isLoading ? "" : <UserNav />}
      </div>
    </div>
  );
}

export default Header;

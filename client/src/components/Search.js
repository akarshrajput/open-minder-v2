import styles from "./Search.module.css";
import { MagnifyingGlass } from "phosphor-react";

function Search() {
  return (
    <div className={styles.search}>
      <MagnifyingGlass size={20} weight="bold" />
      <input placeholder="Search" />
    </div>
  );
}

export default Search;

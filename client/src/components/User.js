import { useParams } from "react-router-dom";
import styles from "./User.module.css";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
function User() {
  const { username, id } = useParams();
  console.log(id);
  const { user } = useAuth();
  if (user !== null) {
    console.log(user);
  }
  return (
    <div className={styles.userWidth}>
      <p>{username}</p>
    </div>
  );
}

export default User;

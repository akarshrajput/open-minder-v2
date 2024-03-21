import { useParams } from "react-router-dom";
import styles from "./User.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { CircleWavyCheck } from "phosphor-react";

const BASE_URL = "http://localhost:3000";

function User() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(
    function () {
      try {
        setIsLoading(true);
        async function getUser() {
          const res = await axios.get(`${BASE_URL}/api/v1/users/${id}`);
          setUser(res.data.data.user);
          setIsLoading(false);
        }
        getUser();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    },
    [id]
  );

  console.log(user);
  return (
    <div className={styles.userWidth}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.userMainInfo}>
            <div className={styles.userNameInfo}>
              <p className={styles.name}>{user.name}</p>
              {user.verified ? (
                <CircleWavyCheck size={16} weight="fill" color="#339af0" />
              ) : (
                ""
              )}
              <p className={styles.userName}>{user.username}</p>
            </div>
            <p className={styles.email}>{user.email}</p>
          </div>
          <div className={styles.secInfo}>
            <p className={styles.passion}>
              Passion : <span>{user.passion}</span>
            </p>
            <p className={styles.bio}>
              Info : <span>{user.bio}</span>
            </p>
            <p className={styles.bio}>
              Membership from :{" "}
              <span>{user.accountCreatedAt?.split("T")[0]}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default User;

import styles from "./UserNav.module.css";
import { Translate } from "phosphor-react";
import { SunDim } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import img from "./../img/default-user.jpg";

function UserNav() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignUp = () => {
    navigate(`/signup`);
  };

  const handleSignIn = () => {
    navigate(`/login`);
  };

  const handleUserNavigate = () => {
    navigate(`/me/${user.user.username}`);
  };

  return (
    <div className={styles.userNav}>
      <p className={styles.navlink}>
        Speech
        <Translate size={14} weight="bold" />
      </p>
      <p className={styles.navCir}>
        <SunDim size={18} weight="bold" />
      </p>
      {user !== null ? (
        <>
          <img
            onClick={handleUserNavigate}
            src={img}
            className={styles.userPhoto}
          />
          <p>{user.user.name}</p>
        </>
      ) : (
        <>
          <p onClick={handleSignUp} className={styles.special1}>
            Sign Up
          </p>
          <p onClick={handleSignIn} className={styles.special2}>
            Sign In
          </p>
        </>
      )}
    </div>
  );
}

export default UserNav;

import styles from "./UserNav.module.css";
import { Translate } from "phosphor-react";
import { SunDim } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import img from "./../img/default-user.jpg";
import { PencilLine } from "phosphor-react";

function UserNav() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleSignUp = () => {
    navigate(`/signup`);
  };

  const handleSignIn = () => {
    navigate(`/login`);
  };

  const handleUserNavigate = () => {
    navigate(`/me/${user.username}`);
    console.log(user);
  };

  const handleWriteBlog = () => {
    navigate(`/writeblog`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
      {isAuthenticated ? (
        <>
          <p className={styles.write} onClick={handleWriteBlog}>
            <PencilLine size={16} /> Write
          </p>
          <img
            onClick={handleUserNavigate}
            src={img}
            className={styles.userPhoto}
          />
          <p className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </p>
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

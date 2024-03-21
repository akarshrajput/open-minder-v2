import styles from "./UserNav.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UserNav() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleSignIn = () => {
    navigate(`/login`);
  };

  const handleUserNavigate = () => {
    navigate(`/me/${user.username}`);
    console.log(user);
  };

  return (
    <div className={styles.userNav}>
      {isAuthenticated ? (
        <>
          <div className={styles.photoContainer}>
            <img
              onClick={handleUserNavigate}
              src={`https://levtozcwxamsnighgjbp.supabase.co/storage/v1/object/public/user-photo/${user?.photo}`}
              className={styles.userPhoto}
              alt="user img"
            />
          </div>
        </>
      ) : (
        <>
          <p onClick={handleSignIn} className={styles.special2}>
            Sign In
          </p>
        </>
      )}
    </div>
  );
}

export default UserNav;

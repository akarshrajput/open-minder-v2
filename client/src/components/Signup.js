import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const { signup, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (name && username && email && password && passwordConfirm) {
      signup(name, username, email, password, passwordConfirm);
    }
  }

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate]
  );

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Name</label>
          <input
            className={styles.commonInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Username</label>
          <input
            className={styles.commonInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            className={styles.commonInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className={styles.commonInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            className={styles.commonInput}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
      <p className={styles.para}>
        Already have account? <span onClick={handleNavigateLogin}>Login</span>
      </p>
    </div>
  );
}

export default Signup;

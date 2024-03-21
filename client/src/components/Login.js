import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (username && password) {
      login(username, password);
    }
  }

  const handleNavigateSignup = () => {
    navigate("/signup");
  };

  const handleBack = () => {
    navigate("/");
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
          <label>Username</label>
          <input
            type="text"
            className={styles.commonInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            className={styles.commonInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Login</button>
      </form>
      <p className={styles.para}>
        Don't have account? <span onClick={handleNavigateSignup}>SignUp</span>
      </p>
      <p className={styles.back}>
        <span onClick={handleBack}>Go back</span>
      </p>
    </div>
  );
}

export default Login;

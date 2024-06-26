import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, isAuthenticated, isLoading } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const trimUsername = username.trim();
    const trimPassword = password.trim();
    if (trimUsername && trimPassword) {
      login(trimUsername, trimPassword);
    } else {
      toast.error("Please fill out all required fields");
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
        <h1
          style={{ textAlign: "center", fontWeight: 400, wordSpacing: "3px" }}
        >
          Login to OpenMinder
        </h1>
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
        <button>{isLoading ? "Logging..." : "Login"}</button>
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

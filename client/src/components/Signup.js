import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styles from "./Login.module.css";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const { signup, isAuthenticated, isLoading } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (name && username && email && password && passwordConfirm) {
      signup(name, username, email, password, passwordConfirm);
    } else {
      toast.error("Please fill out all required fields");
    }
  }

  const handleNavigateLogin = () => {
    navigate("/login");
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
          Create new Account
        </h1>
        <div>
          <label>Name</label>
          <input
            type="text"
            className={styles.commonInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label>Email</label>
          <input
            type="text"
            className={styles.commonInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            className={styles.commonInput}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button>{isLoading ? "Signing..." : "Signup"}</button>
      </form>
      <p className={styles.para}>
        Already have account? <span onClick={handleNavigateLogin}>Login</span>
      </p>
      <p className={styles.back}>
        <span onClick={handleBack}>Go back</span>
      </p>
    </div>
  );
}

export default Signup;

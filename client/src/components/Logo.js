import styles from "./Logo.module.css";
import img from "./../img/op.png";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.logo}>
      <img onClick={handleLogoClick} src={img} alt="Open Minder Logo" />
    </div>
  );
}
export default Logo;

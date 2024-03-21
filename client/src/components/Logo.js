import styles from "./Logo.module.css";
import img from "./../img/open-minder.png";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.logo}>
      <img onClick={handleLogoClick} src={img} alt="Open Minder Logo" />
      {/* <p>Open Minder</p> */}
    </div>
  );
}
export default Logo;

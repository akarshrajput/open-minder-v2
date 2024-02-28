import { useParams } from "react-router-dom";
import Header from "../components/Header";
import User from "../components/User";

function UserLayout() {
  const { username } = useParams();
  console.log(username);
  return (
    <div className="user-layout">
      <Header />
      <User />
    </div>
  );
}

export default UserLayout;

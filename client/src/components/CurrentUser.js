import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CurrentUser() {
  const { user } = useAuth();

  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
}

export default CurrentUser;
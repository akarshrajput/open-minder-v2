import { useEffect } from "react";
import { useParams } from "react-router-dom";

function CurrentUser() {
  useEffect(function () {}, []);

  const { username } = useParams();
  return (
    <div>
      <p>{username}</p>
    </div>
  );
}

export default CurrentUser;

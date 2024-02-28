import CurrentUser from "../components/CurrentUser";
import Header from "../components/Header";

function CurrentUserLayout() {
  return (
    <div className="current-user-layout">
      <Header />
      <CurrentUser />
    </div>
  );
}

export default CurrentUserLayout;

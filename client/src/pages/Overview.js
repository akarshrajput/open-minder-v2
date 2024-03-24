import Footer from "../components/Footer";
import GridBlogView from "../components/GridBlogView";
import GridBlogWideView from "../components/GridBlogWideView";
import Hero from "../components/Hero";
import Header from "./../components/Header";
import { useAuth } from "../context/AuthContext";
import ShareMind from "../components/ShareMind";
import Loader from "../components/Loader";

function Overview() {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <div className="overview">
      <Header bg={isLoading ? "#fff" : isAuthenticated ? "#fff" : "#fcc419"} />
      {isLoading ? <Loader /> : isAuthenticated ? <ShareMind /> : <Hero />}
      {/* <Hero /> */}
      <GridBlogView />
      <GridBlogWideView />
      <Footer />
    </div>
  );
}

export default Overview;

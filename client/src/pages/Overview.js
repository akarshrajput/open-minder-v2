// import ExploreMore from "../components/ExploreMore";
import Footer from "../components/Footer";
import GridBlogView from "../components/GridBlogView";
import GridBlogWideView from "../components/GridBlogWideView";
import Hero from "../components/Hero";
import Header from "./../components/Header";

function Overview() {
  return (
    <div className="overview">
      <Header />
      <Hero />
      <GridBlogView />
      <GridBlogWideView />
      <Footer />
    </div>
  );
}

export default Overview;

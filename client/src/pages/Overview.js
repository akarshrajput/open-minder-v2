// import ExploreMore from "../components/ExploreMore";
import Footer from "../components/Footer";
import GridBlogView from "../components/GridBlogView";
import GridBlogWideView from "../components/GridBlogWideView";
import Hero from "../components/Hero";

function Overview() {
  return (
    <div className="overview">
      <Hero />
      {/* <ExploreMore /> */}
      <GridBlogView />
      <GridBlogWideView />
      <Footer />
    </div>
  );
}

export default Overview;

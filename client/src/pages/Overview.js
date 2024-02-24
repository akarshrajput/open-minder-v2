import Footer from "../components/Footer";
import GridBlogView from "../components/GridBlogView";
import GridBlogWideView from "../components/GridBlogWideView";
import Hero from "../components/Hero";

function Overview() {
  return (
    <div className="overview">
      <Hero />
      <GridBlogView />
      <GridBlogWideView />
      <Footer />
    </div>
  );
}

export default Overview;

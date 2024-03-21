import Footer from "../components/Footer";
import GridBlogView from "../components/GridBlogView";
import GridBlogWideView from "../components/GridBlogWideView";
import Hero from "../components/Hero";
import Header from "./../components/Header";

function Overview() {
  return (
    <div className="overview">
      <Header bg="#fcc419" />
      <Hero />
      <GridBlogView />
      <GridBlogWideView />
      <Footer />
    </div>
  );
}

export default Overview;

import Blog from "../components/Blog";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
// import Cookies from "js-cookie";
function BlogLayout() {
  // const isJwtCookieSet = Cookies.get("jwt") !== undefined;

  // if (isJwtCookieSet) {
  //   console.log("The 'jwt' cookie is set.");
  // } else {
  //   console.log("The 'jwt' cookie is not set.");
  // }
  return (
    <div className="blog-layout">
      <Header />
      <Blog />
      <Footer />
    </div>
  );
}

export default BlogLayout;

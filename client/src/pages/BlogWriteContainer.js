import Footer from "../components/Footer";
import Header from "../components/Header";
import WriteBlog from "../components/WriteBlog";

function BlogWriteContainer() {
  return (
    <div className="write-blog-container">
      <Header />
      <WriteBlog />
      <Footer />
    </div>
  );
}

export default BlogWriteContainer;

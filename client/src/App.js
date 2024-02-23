import React, { useState, useEffect } from "react";
import Header from "./components/Header";
// import { BlogsProvider } from "./context/blogsContext";

function App() {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(function () {
    async function getAllBlogs() {
      const res = await fetch("http://localhost:3000/api/v1/blogs");
      const data = await res.json();
      const blogsArray = data.data.blogs;
      console.log(blogsArray);
      setAllBlogs(blogsArray);
    }
    getAllBlogs();
  }, []);
  return (
    <div>
      <Header />
      {allBlogs.map((blog) => (
        <Overview blog={blog} key={blog.id} />
      ))}
    </div>
  );
}

function Overview({ blog }) {
  return (
    <div className="blog-element">
      <p>{blog.heading}</p>
      <p>{blog.description}</p>
    </div>
  );
}

export default App;

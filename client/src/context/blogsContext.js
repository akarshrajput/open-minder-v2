import { useState, useEffect, createContext, useContext } from "react";

const BASE_URL = "http://localhost:3000";

const BlogsContext = createContext();

function BlogsProvider({ children }) {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(function () {
    async function getAllBlogs() {
      const res = await fetch(`${BASE_URL}/api/v1/blogs`);
      const data = await res.json();
      const blogsArray = data.data.blogs;
      console.log(blogsArray);
      setAllBlogs(blogsArray);
    }
    getAllBlogs();
  }, []);

  return (
    <BlogsContext.Provider value={{ allBlogs }}>
      {children}
    </BlogsContext.Provider>
  );
}

export { BlogsProvider };

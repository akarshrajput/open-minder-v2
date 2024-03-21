import { useState, useEffect, createContext, useContext } from "react";

const BASE_URL = "open-minder-v2-backend.up.railway.app";

const BlogsContext = createContext();

function BlogsProvider({ children }) {
  const [allBlogs, setAllBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getAllBlogs() {
      setIsLoading(true);
      const res = await fetch(
        `${BASE_URL}/api/v1/blogs?sort=-createdAt&limit=8`
      );
      const data = await res.json();
      const blogsArray = data.data.blogs;
      // console.log(blogsArray);
      setAllBlogs(blogsArray);
      setIsLoading(false);
    }
    getAllBlogs();
  }, []);

  return (
    <BlogsContext.Provider value={{ allBlogs, isLoading }}>
      {children}
    </BlogsContext.Provider>
  );
}

function useAllBlogs() {
  const context = useContext(BlogsContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the city CitiesProvider");
  return context;
}

export { BlogsProvider, useAllBlogs };

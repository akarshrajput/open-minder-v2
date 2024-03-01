import { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { MagnifyingGlass } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const BASE_URL = "https://open-minder-v2.onrender.com";

function Search() {
  const [input, setInput] = useState("");
  const [showContainer, setShowContainer] = useState(false);
  const [blogHeadings, setBlogHeadings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const results = blogHeadings.length;

  const handleBlogClick = (blogId) => {
    navigate(`/en-us/blog/${blogId}`);
    setShowContainer(false);
    setInput("");
  };

  useEffect(
    function () {
      try {
        async function getSearchedBlogs() {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/api/v1/blogs?heading=${input}`);
          const data = await res.json();
          const headings = data.data.blogs.map((blog) => ({
            id: blog.id,
            text: `${blog.author.name} : ${blog.heading}`,
          }));
          console.log(headings);
          setBlogHeadings(headings);
        }
        getSearchedBlogs();
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setIsLoading(false);
      }
    },
    [input]
  );

  return (
    <>
      <div className={styles.search}>
        <MagnifyingGlass size={20} weight="bold" />
        <input
          placeholder="Search"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowContainer(!!e.target.value); // Show container when there's input
          }}
        />
      </div>
      <SearchResult
        showContainer={showContainer}
        isLoading={isLoading}
        blogHeadings={blogHeadings}
        results={results}
        handleBlogClick={handleBlogClick}
      />
    </>
  );
}

function SearchResult({
  showContainer,
  isLoading,
  blogHeadings,
  results,
  handleBlogClick,
}) {
  if (isLoading) return <Loader />;
  return (
    <div>
      {showContainer && (
        <div className={styles.searchContainer}>
          {blogHeadings.length === 0 ? (
            <p>No results</p>
          ) : (
            <ul>
              <li>Results : {results}</li>
              {blogHeadings.map((item, index) => (
                <li onClick={() => handleBlogClick(item.id)} key={index}>
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;

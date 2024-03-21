import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./Search.module.css";
import { MagnifyingGlass } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { getSearchBlogs } from "./../services/apiBlogs";

function Search() {
  const [input, setInput] = useState("");
  const [showContainer, setShowContainer] = useState(false);
  const [blogHeadings, setBlogHeadings] = useState([]);
  const [searchTypeValue, setSearchTypeValue] = useState("blog");

  const { isLoading, data } = useQuery({
    queryKey: ["searchBlogs", input],
    queryFn: () => getSearchBlogs(input),
  });

  const navigate = useNavigate();

  const results = blogHeadings?.length;

  const handleBlogClick = (blogId) => {
    navigate(`/en-us/blog/${blogId}`);
    setShowContainer(false);
    setInput("");
  };

  useEffect(() => {
    if (data && data.data && data.data.blogs) {
      const headings = data.data.blogs.map((blog) => ({
        id: blog.id,
        text: `${blog.author.name} : ${blog.heading}`,
      }));
      setBlogHeadings(headings);
    }
  }, [data]);

  return (
    <div>
      <div className={styles.search}>
        <select
          onChange={(e) => setSearchTypeValue(e.target.value)}
          value={searchTypeValue}
          className={styles.selectType}
        >
          <option value="blog">Blog</option>
          <option value="user">User</option>
        </select>
        <input
          placeholder={
            searchTypeValue === "blog"
              ? `Search for minders, articles and more...`
              : `Search for ${searchTypeValue}s`
          }
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowContainer(!!e.target.value); // Show container when there's input
          }}
        />
        <MagnifyingGlass
          className={styles.searchSubmit}
          size={20}
          weight="bold"
        />
      </div>
      <SearchResult
        showContainer={showContainer}
        isLoading={isLoading}
        blogHeadings={blogHeadings}
        results={results}
        handleBlogClick={handleBlogClick}
      />
    </div>
  );
}

function SearchResult({
  showContainer,
  isLoading,
  blogHeadings,
  results,
  handleBlogClick,
}) {
  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <div>
      {showContainer && (
        <div className={styles.searchContainer}>
          {isLoading ? (
            <p>Loading...</p>
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

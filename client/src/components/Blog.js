import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import styles from "./Blog.module.css";
import { CircleWavyCheck } from "phosphor-react";
import img from "./../img/blog-image.jpeg";
import user from "./../img/default-user.jpg";

const BASE_URL = "https://open-minder-v2.onrender.com";

function Blog() {
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  // console.log(id);

  useEffect(
    function () {
      async function getBlog() {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/api/v1/blogs/${id}`);
        const data = await res.json();
        setBlog(data.data.blog);
        setIsLoading(false);
      }
      getBlog();
    },
    [id]
  );
  console.log(blog);
  return <div>{isLoading ? <Loader /> : <BlogContainer blog={blog} />}</div>;
}

function BlogContainer({ blog }) {
  const tagString = Array.isArray(blog.tags) ? `#${blog.tags.join(" #")}` : "";

  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/${blog.author.username}/${blog.author._id}`);
  };
  return (
    <div className={styles.blogWidth}>
      <div className={styles.blogInfo}>
        <p className={styles.authorCategory}>{blog.category}</p>
        <div className={styles.blogTime}>
          <p className={styles.minRead}>{blog.readTime} min read</p>
          <p className={styles.createdAt}>{blog?.createdAt?.split("T")[0]}</p>
        </div>
        <div>
          <p className={styles.blogHeading}>{blog.heading}</p>
          <p className={styles.tags}>{tagString}</p>
          <p className={styles.blogDesc}>{blog.description}</p>
        </div>
        <div className={styles.authorInfo}>
          <img
            src={user}
            className={styles.userImage}
            alt={blog.author?.username}
          />
          <p className={styles.authorName} onClick={handleUserClick}>
            {blog.author?.name}
          </p>
          <p>
            {blog.author?.verified ? (
              <CircleWavyCheck size={16} weight="fill" color="#339af0" />
            ) : (
              ""
            )}
          </p>
        </div>
        <div>
          <img
            src={img}
            className={styles.blogPhoto}
            alt={blog.author?.username}
          />
          <p className={styles.blogDescAlt}>@openminder</p>
          <p className={styles.blogContent}>{blog.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Blog;

import { useAllBlogs } from "../context/blogsContext";
import styles from "./GridBlogView.module.css";
import Loader from "./Loader";
import { ArrowElbowRightUp, CircleWavyCheck } from "phosphor-react";
import img from "./../img/default-user.jpg";

function GridBlogView() {
  const { allBlogs, isLoading } = useAllBlogs();
  console.log(allBlogs);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading />
          <div className={styles.blogContainer}>
            {allBlogs.map((blog) => (
              <GridBlogItem blog={blog} key={blog.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default GridBlogView;

function Heading() {
  return (
    <div className={styles.heading}>
      <p>Trending on Open Minder </p>
      <ArrowElbowRightUp size={20} weight="bold" />
    </div>
  );
}

function GridBlogItem({ blog }) {
  const blogHeading = blog.heading.slice(0, 30) + " ...";
  const blogDescription = blog.description.slice(0, 200) + " ...";
  const tags = "#" + blog.tags.join(" #");
  const date = blog.createdAt.split("T")[0];
  return (
    <div className={styles.blogItem}>
      <div className={styles.authorInfo}>
        <img
          className={styles.authorImage}
          src={img}
          alt={`${blog.author.name}'s profile`}
        />
        <p className={styles.authorName}>{blog.author.name}</p>
        {blog.author.verified ? (
          <CircleWavyCheck size={16} weight="fill" color="#339af0" />
        ) : (
          ""
        )}
        <p className={styles.autherUsername}>@{blog.author.username}</p>
      </div>
      <div className={styles.blofInfo}>
        <p className={styles.blogHeading}>{blogHeading}</p>
        <p className={styles.blogDesc}>{blogDescription}</p>
      </div>
      <div className={styles.blogDetail}>
        <p className={styles.blogCategory}>{blog.category}</p>
        <p className={styles.blogTags}>{tags}</p>
        <p className={styles.blogDate}>{date}</p>
      </div>
    </div>
  );
}

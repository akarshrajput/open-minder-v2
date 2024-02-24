import { useAllBlogs } from "../context/blogsContext";
import styles from "./GridBlogWideView.module.css";
import Loader from "./Loader";
import img from "./../img/default-user.jpg";
import img1 from "./../img/blog-image.jpeg";
import { ArrowElbowRightDown, CircleWavyCheck } from "phosphor-react";

function GridBlogWideView() {
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

function Heading() {
  return (
    <div className={styles.heading}>
      <p>New on Open Minder </p>
      <ArrowElbowRightDown size={20} weight="bold" />
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
      <div className={styles.blogContent}>
        <div className={styles.authorInfo}>
          <div className={styles.nameCont}>
            <img className={styles.authorImage} src={img} />
            <p className={styles.authorName}>{blog.author.name}</p>
            {blog.author.verified ? (
              <CircleWavyCheck size={16} weight="fill" color="#74b816" />
            ) : (
              ""
            )}
          </div>
          <p className={styles.autherUsername}>@{blog.author.username}</p>
          <p className={styles.blogDate}>{date}</p>
        </div>
        <div className={styles.blofInfo}>
          <p className={styles.blogHeading}>{blogHeading}</p>
          <p className={styles.blogDesc}>{blogDescription}</p>
        </div>
        <div className={styles.blogDetail}>
          <p className={styles.blogCategory}>{blog.category}</p>
          <p className={styles.blogTags}>{tags}</p>
          <p className={styles.views}>{blog.views} view</p>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.blogImage} src={img1} alt="Blog Image" />
      </div>
    </div>
  );
}

export default GridBlogWideView;

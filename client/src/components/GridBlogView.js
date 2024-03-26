import styles from "./GridBlogView.module.css";
import Loader from "./Loader";
import {
  ArrowElbowRightDown,
  CircleWavyCheck,
  Sparkle,
  Plus,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogsTrending } from "../services/apiBlogs";
import Error from "./Error";

function GridBlogView() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["getAllBlogsTrending"],
    queryFn: getAllBlogsTrending,
  });
  if (isError) {
    return <Error />;
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading />
          <div className={styles.blogContainer}>
            {data?.data?.blogs.map((blog) => (
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
      <ArrowElbowRightDown size={20} weight="bold" />
    </div>
  );
}

function GridBlogItem({ blog }) {
  const blogHeading = blog.heading.slice(0, 30) + " ...";
  const blogDescription = blog.description.slice(0, 200) + " ...";
  const tags = "#" + blog.tags.join(" #");
  const date = blog.createdAt.split("T")[0];

  const navigate = useNavigate();

  const handleBlogClick = () => {
    // Use the navigate function to redirect to the specific blog with its id
    navigate(`/en-us/blog/${blog.id}`);
  };
  const handleUserClick = () => {
    navigate(`/${blog.author.username}/${blog.author._id}`);
  };
  return (
    <div className={styles.blogItem}>
      <div className={styles.authorInfo}>
        <div className={styles.photoContainer}>
          <img
            className={styles.userPhoto}
            src={`https://levtozcwxamsnighgjbp.supabase.co/storage/v1/object/public/user-photo/${blog?.author?.photo}`}
            alt={`${blog.author.name}'s profile`}
          />
        </div>
        <p className={styles.authorName} onClick={handleUserClick}>
          {blog.author.name}
        </p>
        {blog.author.verified ? (
          <CircleWavyCheck size={16} weight="fill" color="#339af0" />
        ) : (
          ""
        )}
        <p className={styles.autherUsername}>@{blog.author.username}</p>
        <p>
          {blog.usedAI ? (
            <Sparkle color="#9c36b5" size={14} weight="fill" />
          ) : (
            ""
          )}
        </p>
        <p className={styles.follow}>
          Follow
          <Plus weight="bold" />
        </p>
      </div>
      <div className={styles.blofInfo}>
        <p className={styles.blogHeading} onClick={handleBlogClick}>
          {blogHeading}
        </p>
        <p className={styles.blogDesc} onClick={handleBlogClick}>
          {blogDescription}
        </p>
      </div>
      <div className={styles.blogDetail}>
        <p className={styles.blogCategory}>{blog.category}</p>
        <p className={styles.blogTags}>{tags}</p>
        <p className={styles.blogDate}>{date}</p>
      </div>
    </div>
  );
}

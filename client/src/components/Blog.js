import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";
import styles from "./Blog.module.css";
import { CircleWavyCheck, Sparkle } from "phosphor-react";
import React, { useEffect } from "react";
import { getBlog } from "./../services/apiBlogs";
import { useQuery } from "@tanstack/react-query";

function Blog() {
  const { id } = useParams();
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["getBlog", id],
    queryFn: () => getBlog(id),
  });
  const blog = data?.data?.blog;

  const tagString = Array.isArray(blog?.tags)
    ? `#${blog?.tags.join(" #")}`
    : "";

  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/${blog.author.username}/${blog.author._id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <div className={styles.blogWidth}>
      <div className={styles.blogInfo}>
        <p className={styles.authorCategory}>{blog?.category}</p>
        <div className={styles.blogTime}>
          <p className={styles.minRead}>{blog?.readTime} min read</p>
          <p className={styles.createdAt}>{blog?.createdAt?.split("T")[0]}</p>
          <p>
            {blog?.usedAI ? (
              <Sparkle color="#9c36b5" size={14} weight="fill" />
            ) : (
              ""
            )}
          </p>
        </div>
        <div>
          <p className={styles.blogHeading}>{blog?.heading}</p>
          <p className={styles.tags}>{tagString}</p>
          <p className={styles.blogDesc}>{blog?.description}</p>
        </div>
        <div className={styles.authorInfo}>
          <div className={styles.photoContainer}>
            <img
              className={styles.userPhoto}
              src={`https://levtozcwxamsnighgjbp.supabase.co/storage/v1/object/public/user-photo/${blog?.author?.photo}`}
              alt={`${blog.author.name}'s profile`}
            />
          </div>
          <p className={styles.authorName} onClick={handleUserClick}>
            {blog?.author?.name}
          </p>
          <p>
            {blog?.author?.verified ? (
              <CircleWavyCheck size={16} weight="fill" color="#339af0" />
            ) : (
              ""
            )}
          </p>
        </div>
        <div>
          <img
            src={blog?.featuredImage}
            className={styles.blogPhoto}
            alt={blog?.author?.username}
          />
          <p className={styles.blogDescAlt}>@openminder</p>
          <p className={styles.blogContent}>
            {blog?.content?.split("\n").map((paragraph, index) => (
              <React.Fragment key={index}>
                {index > 0 && <br />}
                {paragraph}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blog;

import styles from "./GridBlogWideView.module.css";
import Loader from "./Loader";
import { CircleWavyCheck, Sparkle, Plus } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { getNewBlogs } from "./../services/apiBlogs";
import { useQuery, useMutation } from "@tanstack/react-query";
import Error from "./Error";
import { useState, useEffect } from "react";
import { followUser } from "../services/apiUser";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function GridBlogWideView() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { isLoading, data, error } = useQuery({
    queryKey: ["getNewBlogs", page],
    queryFn: () => getNewBlogs(page),
  });

  useEffect(() => {
    if (data) {
      const updatedBlogs = data?.data?.blogs;
      setBlogs((prevBlogs) => [...prevBlogs, ...updatedBlogs]);
    }
  }, [data]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  if (error) {
    return <Error />;
  }

  if (isLoading && !blogs.length) {
    return <Loader />;
  }

  return (
    <div className={styles.blogFlexContainer}>
      {/* <Heading /> */}
      <div className={styles.blogContainer}>
        {blogs.map((blog) => (
          <GridBlogItem blog={blog} key={blog.id} navigate={navigate} />
        ))}
      </div>

      <p onClick={handleLoadMore} className={styles.loadMore}>
        {isLoading ? "Loading" : "Load More"}
      </p>
    </div>
  );
}

// function Heading() {
//   return (
//     <div className={styles.heading}>
//       <p>New </p>
//       <Rows size={18} weight="fill" color="#212529" />
//     </div>
//   );
// }

function GridBlogItem({ blog, navigate }) {
  const blogHeading = blog.heading.slice(0, 30) + " ...";
  const blogDescription = blog.description.slice(0, 200) + " ...";
  const tags = "#" + blog.tags.join(" #");
  const date = blog.createdAt.split("T")[0];
  const [isFollow, setIsFollow] = useState(false);
  const { user, getCookie } = useAuth();

  const handleBlogClick = () => {
    navigate(`/en-us/blog/${blog.id}`);
  };

  const handleUserClick = () => {
    navigate(`/${blog.author.username}/${blog.author._id}`);
  };

  const { mutate: mutateUser } = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      toast.success("Followed User successfully");
    },
    onError: () => {
      toast.error("Error following user");
    },
  });

  const handleFollowUser = () => {
    const userId = blog.author._id;
    const token = getCookie("jwt");
    const userData = { token, userId };
    mutateUser(userData);
    setIsFollow(true);
  };

  let followText;
  if (blog?.author.followers.includes(user?._id)) {
    followText = true;
  } else {
    followText = false;
  }

  let showFollow;
  if (user?._id === blog?.author?._id) {
    showFollow = false;
  } else {
    showFollow = true;
  }

  return (
    <div className={styles.blogItem}>
      <div className={styles.blogContent}>
        <div className={styles.authorInfoContainer}>
          <div className={styles.authorInfo}>
            <div className={styles.nameCont}>
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
              {blog.author.verified && (
                <CircleWavyCheck size={16} weight="fill" color="#339af0" />
              )}
            </div>

            <p className={styles.blogDate}>{date}</p>
            {blog.usedAI && <Sparkle color="#9c36b5" size={14} weight="fill" />}
          </div>
          <p onClick={handleFollowUser} className={styles.follow}>
            {showFollow
              ? isFollow
                ? "Following"
                : followText
                ? "Following"
                : "Follow"
              : ""}
            {showFollow
              ? !isFollow && !followText && <Plus weight="bold" />
              : ""}
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
          <p className={styles.views}>{blog.views} view</p>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img
          onClick={handleBlogClick}
          className={styles.blogImage}
          src={blog?.featuredImage}
          alt={`Blog of ${blog.heading}`}
        />
      </div>
    </div>
  );
}

export default GridBlogWideView;

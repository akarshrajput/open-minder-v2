import styles from "./GridBlogView.module.css";
import Loader from "./Loader";
import { TrendUp, CircleWavyCheck, Sparkle, Plus } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllBlogsTrending } from "../services/apiBlogs";
import Error from "./Error";
import { followUser } from "../services/apiUser";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

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
          {/* <Heading /> */}
          <div className={styles.blogContainer}>
            {data?.data?.blogs.map((blog) => (
              <GridBlogItem blog={blog} key={blog.id} />
            ))}
          </div>
          <p className={styles.seeMore}>
            See more Trending <TrendUp weight="bold" />
          </p>
        </>
      )}
    </>
  );
}

export default GridBlogView;

// function Heading() {
//   return (
//     <div className={styles.heading}>
//       <Fire weight="fill" size={18} color="#fd7e14" />
//     </div>
//   );
// }

function GridBlogItem({ blog }) {
  const { user, getCookie } = useAuth();
  const blogHeading = blog.heading.slice(0, 30) + " ...";
  const blogDescription = blog.description.slice(0, 200) + " ...";
  const tags = "#" + blog.tags.join(" #");
  const date = blog.createdAt.split("T")[0];
  const [isFollow, setIsFollow] = useState(false);

  const navigate = useNavigate();

  const { mutate: mutateUser } = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      toast.success("Followed User successfully");
    },
    onError: () => {
      toast.error("Error following user");
    },
  });

  const handleBlogClick = () => {
    // Use the navigate function to redirect to the specific blog with its id
    navigate(`/en-us/blog/${blog.id}`);
  };
  const handleUserClick = () => {
    navigate(`/${blog.author.username}/${blog.author._id}`);
  };

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
      <div className={styles.authorInfoContainer}>
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
          {/* <p className={styles.autherUsername}>@{blog.author.username}</p> */}
          <p>
            {blog.usedAI ? (
              <Sparkle color="#9c36b5" size={14} weight="fill" />
            ) : (
              ""
            )}
          </p>
        </div>
        <p onClick={handleFollowUser} className={styles.follow}>
          {showFollow
            ? isFollow
              ? "Following"
              : followText
              ? "Following"
              : "Follow"
            : ""}
          {showFollow ? !isFollow && !followText && <Plus weight="bold" /> : ""}
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

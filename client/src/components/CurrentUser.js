import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./CurrentUser.module.css";
import { useForm } from "react-hook-form";
import { updateUserData, updateUserPhoto } from "../services/apiUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  deleteCurrentUserBlog,
  getCurrentUserBlogs,
} from "../services/apiBlogs";
import { ArrowDown } from "phosphor-react";

function CurrentUser() {
  const queryClient = useQueryClient();
  const { user, logout, getCookie } = useAuth();
  const navigate = useNavigate();

  const { register: registerImage, handleSubmit: handleSubmitImage } =
    useForm();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const userId = user?._id;

  const { data: currentUserBlogs } = useQuery({
    queryKey: ["currentUserBlogs", userId],
    queryFn: () => getCurrentUserBlogs(userId),
  });

  const allCurrentUserBlogs = currentUserBlogs?.data?.blogs;

  const { mutate: mutateData } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      toast.success("Data updated successfully");
    },
    onError: () => {
      toast.error("Error Updating data");
    },
  });

  const { mutate: deleteBlog } = useMutation({
    mutationFn: deleteCurrentUserBlog,
    onSuccess: () => {
      toast.success("Blog deleted");
      queryClient.invalidateQueries({ queryKey: ["currentUserBlogs"] });
    },
    onError: () => {
      toast.error("Blog not deleted");
    },
  });

  const { mutate: mutatePhoto } = useMutation({
    mutationFn: updateUserPhoto,
    onSuccess: () => {
      toast.success("Photo uploaded successfully");
    },
    onError: () => {
      toast.error("Error Uploading photo");
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user?.name);
      setValue("email", user?.email);
      setValue("passion", user?.passion);
      setValue("bio", user?.bio);
    }
  }, [user, setValue]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const onSubmitImge = (data) => {
    const token = getCookie("jwt");
    const dataSet = { token, data };
    mutatePhoto(dataSet);
  };

  const onSubmit = (data) => {
    const token = getCookie("jwt");
    const dataSet = { token, data };
    mutateData(dataSet);
  };

  return (
    <div className={styles.currentUserContainer}>
      <div className={styles.userInfo}>
        <p className={styles.name}>Welcome, {user?.name}</p>
        <p className={styles.username}>@{user?.username}</p>
        <p onClick={handleLogout} className={styles.logout}>
          Logout
        </p>
      </div>
      <div className={styles.userData}>
        <form
          onSubmit={handleSubmitImage(onSubmitImge)}
          className={styles.photoForm}
        >
          <div className={styles.photoContainer}>
            <img
              className={styles.userPhoto}
              src={`https://levtozcwxamsnighgjbp.supabase.co/storage/v1/object/public/user-photo/${user?.photo}`}
              alt={`${user?.name}'s profile`}
            />
          </div>
          <div className={styles.photoFlex}>
            <input
              id="image"
              type="file"
              accept="image/*"
              {...registerImage("image", {
                required: "This field is required",
              })}
            />
            <label htmlFor="image" className={styles.imageInput}>
              Choose a file
            </label>
          </div>

          <button className={styles.submit}>Upload</button>
        </form>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.textForm}>
          <div className={`${styles.uName} ${styles.commonUserData}`}>
            <label>Name</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "This field is required",
              })}
            />
            <p className={styles.errorText}>
              {errors.name && errors.name.message}
            </p>
          </div>
          <div className={`${styles.uEmail} ${styles.commonUserData}`}>
            <label>Email</label>
            <input
              type="text"
              id="email"
              disabled={true}
              {...register("email", {
                required: "This field is required",
              })}
            />
            <p className={styles.errorText}>
              {errors.email && errors.email.message}
            </p>
          </div>
          <div className={`${styles.uPassion} ${styles.commonUserData}`}>
            <label>Passion</label>
            <input
              type="text"
              id="passion"
              {...register("passion", {
                required: "This field is required",
              })}
            />
            <p className={styles.errorText}>
              {errors.passion && errors.passion.message}
            </p>
          </div>
          <div className={`${styles.uBio} ${styles.commonUserData}`}>
            <label>Bio</label>
            <textarea
              rows={8}
              type="text"
              id="bio"
              {...register("bio", {
                required: "This field is required",
              })}
            />
            <p className={styles.errorText}>
              {errors.bio && errors.bio.message}
            </p>
          </div>

          <button type="submit" className={styles.submit}>
            Save
          </button>
        </form>
      </div>
      <div>
        <p className={styles.currentArticleQuote}>
          Your all articles <ArrowDown weight="bold" />
        </p>
        <div className={styles.currentBlogContainer}>
          {allCurrentUserBlogs &&
            allCurrentUserBlogs.map((blog) => (
              <CurrentUserBlogs
                blog={blog}
                deleteBlog={deleteBlog}
                getCookie={getCookie}
                key={blog._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function CurrentUserBlogs({ blog, deleteBlog, getCookie }) {
  const handleDeleteBlog = () => {
    const token = getCookie("jwt");
    const blogId = blog._id;
    const data = { token, blogId };
    deleteBlog(data);
  };

  const blogHeading = blog.heading.slice(0, 60);
  return (
    <div className={styles.currentUserBlogs}>
      <div>
        <p className={styles.currentArticleId}>ID : {blog?._id}</p>
        <p className={styles.currentArticleHeading}>
          {blog.heading.length > 60 ? `${blogHeading} ...` : `${blogHeading}`}
        </p>
      </div>
      <p onClick={handleDeleteBlog} className={styles.deleteBlog}>
        Delete
      </p>
    </div>
  );
}

export default CurrentUser;

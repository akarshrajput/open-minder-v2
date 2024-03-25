import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styles from "./WriteBlogAI.module.css";
import { useAuth } from "../context/AuthContext";
import { Sparkle, Upload } from "phosphor-react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../services/apiBlogs";
import { useState } from "react";
import axios from "axios";
import { PaperPlaneRight, PencilSimple } from "phosphor-react";

const api = "https://gemini-api.up.railway.app";

function WriteBlog() {
  const { getCookie, user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setGenerating] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      toast.success("New blog successfully created by AI");
      queryClient.invalidateQueries({ queryKey: ["getNewBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["getAllBlogsTrending"] });
      navigate("/");
      window.scrollTo(0, 0);
      reset();
    },
    onError: () => {
      toast.error("Error creating Blog");
    },
  });

  async function apiData(prompt) {
    try {
      setGenerating(true);
      const response = await axios.post(`${api}/generate-text`, { prompt });
      console.log(response);
      return response.data.generatedText.replace(/\*/g, "");
    } catch (error) {
      toast.error("Error ", error);
    } finally {
      setGenerating(false);
    }
  }

  const handlePrompt = async () => {
    if (!prompt) return;
    const generatedContent = await apiData(prompt);
    if (generatedContent) {
      setValue("content", generatedContent);
    }
  };

  const onSubmit = async (data) => {
    try {
      const { featuredImage } = data;
      const blogImage = featuredImage[0];
      const userId = user?._id;
      const token = getCookie("jwt");
      const usedAI = true;
      const blogData = {
        data,
        userId,
        token,
        blogImage,
        usedAI,
      };
      mutate({
        blogData,
      });
    } catch (error) {
      console.error("Error occurred while writing blog:", error);
    }
  };

  const handleWriteWithoutAI = () => {
    navigate(`/writeblog`);
  };

  const categories = [
    "",
    "Adventure",
    "Analysis",
    "Apps",
    "Architecture",
    "Arts",
    "Automotive",
    "Beauty",
    "Book Reviews",
    "Business",
    "Cars and Bikes",
    "Career Advice",
    "Celebrity News",
    "Concerts",
    "Crime",
    "Cryptocurrency",
    "Culture",
    "Current Affairs",
    "Cybersecurity",
    "DIY",
    "DIY Projects",
    "Diversity and Inclusion",
    "Economics",
    "Education",
    "Education Trends",
    "Entertainment",
    "Environment",
    "Entrepreneurship",
    "Fashion",
    "Family",
    "Fitness",
    "Food",
    "Gadgets",
    "Gaming",
    "Gaming Reviews",
    "Global Issues",
    "Health",
    "History",
    "Home and Garden",
    "Home Decor",
    "Human Rights",
    "Immigration",
    "Inspirational Stories",
    "International Relations",
    "Investigative Journalism",
    "LGBTQ+ Issues",
    "Law and Legal",
    "Lifestyle",
    "Literature",
    "Luxury Living",
    "Meditation",
    "Medical Breakthroughs",
    "Mental Health",
    "Men's Issues",
    "Motivation",
    "Movie Reviews",
    "Music",
    "Nature",
    "News",
    "Nutrition",
    "Opinion",
    "Parenting",
    "Parenting Tips",
    "Personal Development",
    "Personal Finance",
    "Philanthropy",
    "Philosopher's Corner",
    "Photography",
    "Poetry",
    "Politics",
    "Real Estate",
    "Recipes",
    "Refugees",
    "Relationships",
    "Religion",
    "Robotics",
    "Science",
    "Space",
    "Social Media",
    "Spirituality",
    "Sports",
    "Startups",
    "Streaming Services",
    "Success Stories",
    "Technology",
    "Technology Trends",
    "Travel",
    "Travel Guides",
    "Trends",
    "TV Shows",
    "Volunteering",
    "Weather",
    "Wellness",
    "Wildlife",
    "Women's Rights",
    "Yoga",
  ];

  return (
    <div className={styles.blogContainer}>
      <div className={styles.pageInfo}>
        <p className={styles.author}>
          <span>author : @{user?.username}</span>
          <span className={styles.noAI} onClick={handleWriteWithoutAI}>
            <PencilSimple size={18} weight="bold" />
            Write without AI
          </span>
          <span className={styles.AItext}>
            <Sparkle size={18} weight="bold" /> You are using Minder AI
          </span>
        </p>
        <p className={styles.notified}>
          * Others will know that you have used AI
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.blogInfo}>
          <div className={styles.commonBlog}>
            <label>Category</label>
            <select
              {...register("category", {
                required: "This field is required.",
              })}
              defaultValue=""
            >
              <option value="">Select</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <p className={styles.errorText}>
              {errors.category && errors.category.message}
            </p>
          </div>
          <div className={styles.commonBlog}>
            <label>Tags</label>
            <input
              {...register("tags", {
                required: "This field is required.",
              })}
            />
            <p className={styles.errorText}>
              {errors.tags && errors.tags.message}
            </p>
          </div>
        </div>

        <div className={`${styles.heading} ${styles.commonItem}`}>
          <label>Blog Image</label>
          <input
            id="blog-image"
            type="file"
            accept="image/*"
            {...register("featuredImage", {
              required: "This field is required",
            })}
          />
          <label className={styles.imageInput} htmlFor="blog-image">
            Upload Image
          </label>
          <p className={styles.errorText}>
            {errors.featuredImage && errors.featuredImage.message}
          </p>
        </div>

        <div className={`${styles.heading} ${styles.commonItem}`}>
          <label>Heading</label>
          <textarea
            {...register("heading", {
              required: "This field is required.",
              minLength: {
                value: 10,
                message: "Heading must have at least 10 characters.",
              },
              maxLength: {
                value: 100,
                message: "Heading must not have more than 100 characters.",
              },
            })}
            rows={1}
          />
          <p className={styles.errorText}>
            {errors.heading && errors.heading.message}
          </p>
        </div>
        <div className={`${styles.description} ${styles.commonItem}`}>
          <label>Description</label>
          <textarea
            {...register("description", {
              required: "This field is required.",
              minLength: {
                value: 20,
                message: "Descripton must have at least 20 characters.",
              },
              maxLength: {
                value: 300,
                message: "Descripton must not have more than 300 characters.",
              },
            })}
            rows={2}
          />
          <p className={styles.errorText}>
            {errors.description && errors.description.message}
          </p>
        </div>

        <div className={`${styles.heading} ${styles.commonItem}`}>
          <label>Create prompt for Content</label>
          <textarea
            value={prompt}
            rows={2}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <p>{prompt.length}/100</p>
          <span className={styles.sendPrompt} onClick={handlePrompt}>
            <span>
              {isGenerating ? "Generating... Please Wait" : "Send prompt"}
            </span>
            <PaperPlaneRight size={16} weight="bold" />
          </span>
        </div>

        <div className={`${styles.content} ${styles.commonItem}`}>
          <label>Write Content</label>
          <textarea
            {...register("content", {
              required: "This field is required.",
              minLength: {
                value: 100,
                message: "Content must have at least 100 characters.",
              },
              maxLength: {
                value: 20000,
                message: "Content must not have more than 20,000 characters.",
              },
            })}
            rows={20}
          />

          <p className={styles.errorText}>
            {errors.content && errors.content.message}
          </p>
        </div>
        <button disabled={isLoading} type="submit">
          <span>{isLoading ? "Posting" : "Post"}</span>{" "}
          <Upload size={18} weight="bold" />
        </button>
      </form>
    </div>
  );
}

export default WriteBlog;

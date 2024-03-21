import axios from "axios";
import supabase from "./supabase";
const BASE_URL = "https://open-minder-v2-backend.up.railway.app";
const supabaseURL = "https://levtozcwxamsnighgjbp.supabase.co";

export async function getAllBlogs() {
  const { data, error } = await axios.get(`${BASE_URL}/api/v1/blogs`);
  if (error) {
    console.error(error);
    throw new Error("Blogs could not be loaded");
  }
  return data;
}

export async function getSearchBlogs(heading) {
  const { data, error } = await axios.get(
    `${BASE_URL}/api/v1/blogs?heading=${heading}`
  );
  if (error) {
    console.error(error);
    throw new Error("Blogs could not be loaded");
  }
  return data;
}

export async function getAllBlogsTrending() {
  const { data, error } = await axios.get(`${BASE_URL}/api/v1/blogs?limit=4`);
  if (error) {
    console.error(error);
    throw new Error("Blogs could not be loaded");
  }
  return data;
}

export async function getNewBlogs() {
  const { data, error } = await axios.get(`${BASE_URL}/api/v1/blogs?limit=24`);
  if (error) {
    console.error(error);
    throw new Error("Blogs could not be loaded");
  }
  return data;
}

export async function getBlog(id) {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Blog could not be loaded");
  }
}

export async function createBlog(data) {
  try {
    const imageName = `${Math.random()}-${Date.now()}-${
      data?.blogData?.blogImage?.name
    }`;
    const imagePath = `${supabaseURL}/storage/v1/object/public/blog-photo/${imageName}`;
    // console.log(data?.blogData?.blogImage);
    const token = data?.blogData?.token;
    const response = await axios.post(
      `${BASE_URL}/api/v1/blogs`,
      {
        featuredImage: imagePath,
        category: data?.blogData?.data.category,
        tags: data?.blogData?.data.tags,
        heading: data?.blogData?.data.heading,
        description: data?.blogData?.data.description,
        content: data?.blogData?.data.content,
        author: data?.blogData?.userId,
        usedAI: data?.blogData?.usedAI,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 2) Upload image to supabase
    const avatarFile = data?.blogData?.blogImage;
    await supabase.storage.from("blog-photo").upload(imageName, avatarFile);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Blog could not be loaded");
  }
}

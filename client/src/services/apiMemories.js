import axios from "axios";
// const BASE_URL = "https://open-minder-v2-backend.up.railway.app";
const BASE_URL = "http://localhost:3000";

export async function getAllMemories() {
  const { data, error } = await axios.get(
    `${BASE_URL}/api/v1/memories?limit=6`
  );
  if (error) {
    console.error(error);
    throw new Error("Memories could not be loaded");
  }
  return data;
}

export async function getCurrentUserMemories(authorId) {
  const { data, error } = await axios.get(
    `${BASE_URL}/api/v1/memories?author=${authorId}&limit=4&sort=-createdAt`
  );
  if (error) {
    console.error(error);
    throw new Error("Memories could not be loaded");
  }
  return data;
}

// export async function getNewBlogs() {
//   const { data, error } = await axios.get(`${BASE_URL}/api/v1/blogs?limit=24`);
//   if (error) {
//     console.error(error);
//     throw new Error("Blogs could not be loaded");
//   }
//   return data;
// }

export async function getMemory(id) {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/memories/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Memory could not be loaded");
  }
}

export async function createMemory(data) {
  try {
    const token = data?.memoryData?.token;
    const response = await axios.post(
      `${BASE_URL}/api/v1/memories`,
      {
        content: data?.memoryData?.data?.content,
        author: data?.blogData?.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    // throw new Error("Blog could not be loaded");
  }
}

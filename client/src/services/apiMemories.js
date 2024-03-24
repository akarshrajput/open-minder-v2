import axios from "axios";
const BASE_URL = "https://open-minder-v2-backend.up.railway.app";

export async function getAllMemories() {
  const { data, error } = await axios.get(`${BASE_URL}/api/v1/memories`);
  if (error) {
    console.error(error);
    throw new Error("Memories could not be loaded");
  }
  return data;
}

export async function getAllMemoriesTrending() {
  const { data, error } = await axios.get(
    `${BASE_URL}/api/v1/memories?sort=-views&limit=8`
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

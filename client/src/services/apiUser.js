import axios from "axios";
import supabase from "./supabase";

const BASE_URL = "https://open-minder-v2-backend.up.railway.app";
// const supabaseURL = "https://levtozcwxamsnighgjbp.supabase.co";

export async function updateUserData(data) {
  try {
    console.log(data?.blogData?.data.category);
    const token = data?.token;
    const response = await axios.patch(
      `${BASE_URL}/api/v1/users/updateMe`,
      {
        name: data?.data?.name,
        email: data?.data?.email,
        passion: data?.data?.passion,
        bio: data?.data?.bio,
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
    throw new Error("Blog could not be loaded");
  }
}

export async function updateUserPhoto(data) {
  // https://levtozcwxamsnighgjbp.supabase.co/storage/v1/object/public/user-photo/user-65ddf8f804f68c9a1a355ef3-Priyanshu%20Yadav
  try {
    const imageName = `${Math.random()}-${Date.now()}-${
      data?.data?.image[0].name
    }`;
    // const imagePath = `${supabaseURL}/storage/v1/object/public/user-photo/${imageName}`;
    const token = data?.token;
    const response = await axios.patch(
      `${BASE_URL}/api/v1/users/updateMe`,
      {
        photo: imageName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 2) Upload image to supabase
    const avatarFile = data?.data?.image[0];
    await supabase.storage.from("user-photo").upload(imageName, avatarFile);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Blog could not be loaded");
  }
}

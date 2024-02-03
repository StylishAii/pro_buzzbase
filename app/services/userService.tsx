import axiosInstance from "@app/utils/axiosInstance";
import Cookies from "js-cookie";

export const updateUser = async (data: updateUser) => {
  const headers = {
    "access-token": Cookies.get("access-token"),
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
  };

  const response = await axiosInstance.put(
    "/api/v1/user",
    {
      user: {
        name: data.name,
        user_id: data.user_id,
      },
    },
    { headers }
  );
  return response;
};

export const getUserData = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/user/");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserIdData = async (user_id: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/users/show_user_id_data?user_id=${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data: FormData) => {
  const response = await axiosInstance.put("/api/v1/user", data, {});
  return response;
};

export const getCurrentUserId = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/users/current");
    return response.data.id;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUsersUserId = async (id: number | null) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/users/${id}/show_current_user_id`
    );
    return response.data.user_id;
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async (user_id: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/users/show_by_user_id?user_id=${user_id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const userFollow = async (userId: number) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/relationships?followed_id=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const userUnFollow = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/relationships/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFollowingUser = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/users/${id}/following_users`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFollowersUser = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/users/${id}/followers_users`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

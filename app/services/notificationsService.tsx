import axiosInstance from "@app/utils/axiosInstance";

export const getNotifications = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/notifications");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

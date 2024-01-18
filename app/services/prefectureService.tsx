import axiosInstance from "@app/utils/axiosInstance";

export const getPrefectures = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/prefectures");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

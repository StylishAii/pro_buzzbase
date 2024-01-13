import axiosInstance from "@app/utils/axiosInstance";

export const getBaseballCategory = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/baseball_categories");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import axiosInstance from "@app/utils/axiosInstance";

export const createGroup = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/api/v1/groups", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGroups = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/groups");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGroupDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/api/v1/groups/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

import axiosInstance from "@app/utils/axiosInstance";

export const createBaseballNote = async (data: createNoteProps) => {
  try {
    const formattedData = { baseball_note: data };
    const response = await axiosInstance.post(
      "/api/v1/baseball_notes",
      formattedData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

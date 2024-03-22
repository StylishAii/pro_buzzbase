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

export const updateBaseballNote = async (
  id: number,
  data: { date: string; title: string; memo: string }
) => {
  try {
    const response = await axiosInstance.put(`/api/v1/baseball_notes/${id}`, {
      baseball_note: data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

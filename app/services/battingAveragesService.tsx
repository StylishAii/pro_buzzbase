import axiosInstance from "@app/utils/axiosInstance";

export const getBattingAverages = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/batting_averages");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createBattingAverage = async (data: BattingAverageData) => {
  try {
    const response = await axiosInstance.post("/api/v1/batting_averages", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBattingAverage = async (
  id: number,
  data: BattingAverageData
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/batting_averages/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkExistingBattingAverage = async (
  gameResultId: number | null,
  userId: number | null
) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/search?game_result_id=${gameResultId}&user_id=${userId}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

import axiosInstance from "@app/utils/axiosInstance";

export const getPitchingResults = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/pitching_results");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPitchingResult = async (data: PitchingResultData) => {
  try {
    const response = await axiosInstance.post("/api/v1/pitching_results", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePitchingResult = async (
  id: number,
  data: PitchingResultData
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/pitching_results/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkExistingPitchingResult = async (
  gameResultId: number | null,
  userId: number | null
) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/pitching_search?game_result_id=${gameResultId}&user_id=${userId}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const getCurrentPitchingResult = async (gameResultId: number | null) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/current_pitching_result_search?game_result_id=${gameResultId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPersonalPitchingResult = async (userId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/pitching_results/personal_pitching_result?user_id=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPersonalPitchingResultStats = async (userId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/pitching_results/personal_pitching_stats?user_id=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

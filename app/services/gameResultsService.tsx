import axiosInstance from "@app/utils/axiosInstance";

export const getGameResults = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/game_result");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createGameResult = async () => {
  try {
    const response = await axiosInstance.post("/api/v1/game_results");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateGameResult = async (
  id: number,
  gameResultData: GameResultData
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/game_results/${id}`,
      gameResultData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBattingAverageId = async (
  id: number,
  data: { game_result: { batting_average_id: number } }
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/game_results/${id}/update_batting_average_id`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePitchingResultId = async (
  id: number,
  data: { game_result: { pitching_result_id: number } }
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/game_results/${id}/update_pitching_result_id`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

import axiosInstance from "@app/utils/axiosInstance";

export const getGameResults = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/v1/game_results/game_associated_data_index"
    );
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

export const getFilterGameResults = async (year: any, matchType: any) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/game_results/filtered_game_associated_data?year=${year}&match_type=${matchType}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFilterGameResultsUserId = async (
  userId: number,
  year: any,
  matchType: any
) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/game_results/filtered_game_associated_data_user_id?user_id=${userId}&year=${year}&match_type=${matchType}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

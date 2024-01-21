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

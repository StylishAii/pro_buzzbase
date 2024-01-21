import axiosInstance from "@app/utils/axiosInstance";

export const getPlateAppearances = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/plate_appearances");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPlateAppearance = async (data: PlateAppearance) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/plate_appearances",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePlateAppearance = async (
  id: number,
  plateAppearance: PlateAppearance
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/plate_appearances/${id}`,
      plateAppearance
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkExistingPlateAppearance = async (
  gameResultId: number | null,
  userId: number | null,
  batterBoxNumber: number
) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/plate_search?game_result_id=${gameResultId}&user_id=${userId}&batter_box_number=${batterBoxNumber}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

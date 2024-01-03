import axiosInstance from "@app/utils/axiosInstance";

interface updateUserPositions {
  userId: string;
  positionIds: number[];
}

export const getPositions = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/positions");
    return response.data;
  } catch (error) {
    console.error("Error fetching positions:", error);
    throw error;
  }
};

export const updateUserPositions = async ({
  userId,
  positionIds,
}: updateUserPositions) => {
  try {
    await axiosInstance.post("/api/v1/user_positions", {
      user_id: userId,
      position_ids: positionIds,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

import axiosInstance from "@app/utils/axiosInstance";
import { Position } from "postcss";

export const getPositions = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/positions");
    return response.data;
  } catch (error) {
    console.error(error);
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

export const getUserPositions = async ({ userId }: getUserPositions) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/users/${userId}/positions`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

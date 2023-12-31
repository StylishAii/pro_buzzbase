import axiosInstance from "@app/utils/axiosInstance";
import Cookies from "js-cookie";

interface positionIds {
  id: string[];
}

export const updateUserPositions = async (positionIds: positionIds) => {
  const headers = {
    "access-token": Cookies.get("access-token"),
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
  };

  try {
    const response = await axiosInstance.put(
      "/api/v1/user/update_positions",
      { positionIds },
      { headers }
    );
  } catch (error) {
    console.log(error);
  }
};

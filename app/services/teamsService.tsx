import axiosInstance from "@app/utils/axiosInstance";

export const getTeams = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/teams");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOrUpdateTeam = async (teamData: teamData) => {
  try {
    const response = await axiosInstance.post("/api/v1/teams", teamData);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
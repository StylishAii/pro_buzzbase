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

export const updateUserTeam = async (userTeamData: userTeamData) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/user_teams/${userTeamData.user_team.user_id}`,
      userTeamData
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

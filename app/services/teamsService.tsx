import axiosInstance from "@app/utils/axiosInstance";

export const getTeamName = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/api/v1/teams/${id}/team_name`);
    return response.data.name;
  } catch (error) {
    console.log(error);
    return "";
  }
};

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

export const updateTeam = async (
  id: number,
  teamData: {
    team: {
      name: string;
      category_id: number | undefined;
      prefecture_id: number | undefined;
    };
  }
) => {
  try {
    const response = await axiosInstance.put(`/api/v1/teams/${id}`, teamData);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

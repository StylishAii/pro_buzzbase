import axiosInstance from "@app/utils/axiosInstance";

export const getTournamentName = async (id: number | null) => {
  try {
    const response = await axiosInstance.get(`/api/v1/tournaments/${id}`);
    return response.data.name;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const getTournaments = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/tournaments");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createTournament = async ({ name }: { name: string }) => {
  try {
    const response = await axiosInstance.post("/api/v1/tournaments", {
      tournament: { name },
    });
    return response.data as TournamentData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTournament = async (id: number, name: string) => {
  try {
    const response = await axiosInstance.put(`/api/v1/tournaments/${id}`, {
      tournament: {
        name,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

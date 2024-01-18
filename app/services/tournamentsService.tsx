import axiosInstance from "@app/utils/axiosInstance";

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

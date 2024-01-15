import axiosInstance from "@app/utils/axiosInstance";

export const createAward = async (awardData: AwardData) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/users/${awardData.award.userId}/awards`,
      awardData
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserAwards = async (userId: UserAwards) => {
  try {
    const response = await axiosInstance.get(`/api/v1/users/${userId}/awards`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAward = async (userId: string, awardId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/users/${userId}/awards/${awardId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

import axiosInstance from "@app/utils/axiosInstance";

export const createGroup = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/api/v1/groups", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGroups = async (userId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/groups/?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGroupDetailUsers = async (groupId: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/groups/${groupId}/show_group_user`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGroupDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/api/v1/groups/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateGroup = async (groupId: number, formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/groups/${groupId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateGroupInfo = async (groupId: number, formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/groups/${groupId}/update_group_info`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createInviteMembers = async (
  groupId: number,
  formData: FormData
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/groups/${groupId}/invite_members`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

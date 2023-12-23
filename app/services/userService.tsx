import axiosInstance from "@app/utils/axiosInstance";
import Cookies from "js-cookie";

export const updateUser = async (data: updateUser) => {
  const headers = {
    "access-token": Cookies.get("access-token"),
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
  };

  const response = await axiosInstance.put(
    "/api/v1/user",
    {
      user: {
        name: data.name,
        user_id: data.user_id,
      },
    },
    { headers }
  );
  return response;
};

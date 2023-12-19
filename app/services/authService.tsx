import axiosInstance from "@app/utils/axiosInstance";
import Cookies from "js-cookie";

export const singUp = async (data: SignUpData) => {
  const response = await axiosInstance.post("/api/v1/auth", {
    email: data.email,
    password: data.password,
    password_confirmation: data.passwordConfirmation,
  });

  return response;
};

export const signIn = async (data: SignInData) => {
  const response = await axiosInstance.post("/api/v1/auth/sign_in", data);

  Cookies.set("access-token", response.headers["access-token"]);
  Cookies.set("client", response.headers["client"]);
  Cookies.set("uid", response.headers["uid"]);

  return response;
};

export const signOut = async () => {
  const response = await axiosInstance.delete("/api/v1/auth/sign_out");

  Cookies.remove("access-token");
  Cookies.remove("client");
  Cookies.remove("uid");

  return response;
};

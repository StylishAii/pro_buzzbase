import axiosInstance from "@app/api/auth/route";

interface SignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignInData {
  email: string;
  password: string;
}

export const singUp = async (data: SignUpData) => {
  return axiosInstance.post("/auth", data);
};

export const signIn = async (data: SignInData) => {
  return axiosInstance.post("/auth/sign_in", data);
};

export const signOut = async () => {
  return axiosInstance.delete("/auth/sign_out");
};

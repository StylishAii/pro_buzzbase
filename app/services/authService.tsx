import axiosInstance from "@app/utils/axiosInstance";
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
  return axiosInstance.post("/api/v1/auth", {
    email: data.email,
    password: data.password,
    password_confirmation: data.passwordConfirmation,
  });
};

export const signIn = async (data: SignInData) => {
  return axiosInstance.post("/api/v1/auth/sign_in", data);
};

export const signOut = async () => {
  return axiosInstance.delete("/api/v1/auth/sign_out");
};

import axiosInstance from "@app/utils/axiosInstance";
export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

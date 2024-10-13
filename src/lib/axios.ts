import { getAccessToken } from "@/app/actions";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://api.niara.io",
});

axiosClient.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
})

export default axiosClient;

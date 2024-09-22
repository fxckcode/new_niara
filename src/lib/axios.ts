import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.niara.io",
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

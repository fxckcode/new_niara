import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://api.niara.io",
});

export default axiosClient;

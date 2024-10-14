import { getAccessToken } from "@/app/actions";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://api.niara.io",
});

axiosClient.interceptors.request.use(async (config) => {
  try {
    const token = await getAccessToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error al obtener el token de acceso');
  }

  return config;
}, (error) => {
  return Promise.reject(error);
})

export default axiosClient;

import { Icome } from "@/constants/data";
import axiosClient from "@/lib/axios"

export const getIcomes = async (filter = undefined) => {
    const response = await axiosClient.get('/ingresos/');
    const data: Icome[] = response.data;

    return data;
}
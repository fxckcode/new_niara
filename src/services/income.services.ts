import { Income } from "@/constants/data";
import axiosClient from "@/lib/axios"

export const getIncomes = async () : Promise<Income[]> => {
    try {
        const response = await axiosClient.get('/ingresos/');
        const data: Income[] = response.data;

        return data;
    } catch (error) {
        console.error('Error al obtener los ingresos');
        return [];
    }
}
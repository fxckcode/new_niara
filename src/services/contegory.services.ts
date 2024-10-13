import { Category } from "@/constants/data";
import axiosClient from "@/lib/axios";

export const getCategories = async (): Promise<{ value: string; label: string }[]> => {
    const response = await axiosClient.get('/categorias/');
    const data: Category[] = response.data;

    const categoryOptions = data.map((category: Category) => ({
        value: category.nombre,
        label: category.nombre 
    }));

    return categoryOptions;
};

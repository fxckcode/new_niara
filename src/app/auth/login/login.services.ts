import axiosClient from "@/lib/axios"

export const login = async (data: { email: string, password: string}) => {
    return await axiosClient.post('/login/', data);
}
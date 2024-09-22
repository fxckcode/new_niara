import axiosClient from "@/lib/axios"

export const login = async (email: string, password: string) => {
    await axiosClient.post('/login', { email, password }).then((response) => {
        console.log(response.data);
        
    })
}
import { baseUrl } from "@/api-folder/auth";
import axios from "axios"


export const forgotpasswordService = async (email: string) => {
    const { data } = await axios.post(`${baseUrl}/auth/forgotpassword`, { email })
    return data
}

export const resetpasswordService = async (password: string,token:string) => {
    const { data } = await axios.post(`${baseUrl}/auth/resetpassword`, { password,token })
    return data
}
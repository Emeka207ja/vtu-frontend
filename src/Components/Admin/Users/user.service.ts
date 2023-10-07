import { baseUrl } from "@/api-folder/auth";
import axios from "axios";




export const getAllUsersService = async (token:string) => {
    const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization :`Bearer ${Token}`
        }
    }
    const { data } = await axios.get(`${baseUrl}/admin/total_users`, config);
    return data;
}
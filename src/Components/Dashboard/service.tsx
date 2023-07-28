import axios from "axios"
import { getProfileApi } from "@/api-folder/profile"

export const getProfile = async (token: string) => {
   const Token = token.replace(/"/g, '')
    const config = {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        }

    const { data } = await axios.get(getProfileApi, config);
    return data;
}
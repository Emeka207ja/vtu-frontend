import axios from "axios"
import { getProfileApi } from "@/api-folder/profile"

export const getProfile = async (token:string) => {
    const config = {
            headers: {
                Authorization: `Bearer ${token.slice(1,-1)}`
            }
        }

    const { data } = await axios.get(getProfileApi, config);
    return data;
}
import axios from "axios"
// import { ioptions } from "@/Components/DataTwo/idataTwo"


export const getAllData = async (token: string) => {
    const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
    const { data } = await axios.get("https://easybuyapi.adaptable.app/api/v1/data", config);
    return data;
}
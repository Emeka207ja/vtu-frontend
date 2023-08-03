import axios from "axios"
// import { ioptions } from "@/Components/DataTwo/idataTwo"
import { idataUpdate } from "./idataUpdate";

export interface iUpdate {
    name: string;

    network: string;

    plan_id: string;

    price: number;

    size: string;
}


export const getAllData = async (token: string) => {
    const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
    const { data } = await axios.get("https://easybuyapi.adaptable.app/api/v1/data", config);
    return data;
}


export const getDatabyId = async (token: string,id: string) => {
    
    const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
    
    const { data } = await axios.get(`https://easybuyapi.adaptable.app/api/v1/data/selected/${id}`, config)
    return data;
}
export const updateById = async (token: string, id: string, details: iUpdate) => {
   
    const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
    
    const { data } = await axios.patch(`https://easybuyapi.adaptable.app/api/v1/data/update/${id}`,details, config)
    return data;
}


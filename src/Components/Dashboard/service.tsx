import axios from "axios"
import { getProfileApi } from "@/api-folder/profile"
import { iStoreMonnify } from "./iaccount";


export interface idetail{ 
    accountReference: string;
    accountName: string;
    currencyCode: string;
    contractCode: string;
    customerEmail: string;
    customerName: string;
    bvn?: string;
    getAllAvailableBanks: boolean;
    preferredBanks:string[]
}


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


export const getReservedAccount = async (token: string,detail:idetail) => {
    const config = {
        headers: {
           " Authorization":` Bearer ${token}`
        }
    }
    const { data } = await axios.post("https://api.monnify.com/api/v2/bank-transfer/reserved-accounts", detail, config);
    return data;
}


export const storeReservedAccount = async (token: string,detail:iStoreMonnify) => {
    const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/profile/monify/saveaccount", detail, config);
    return data;
}
export const userReservedAccount = async (token: string) => {
    const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
    const { data } = await axios.get("https://easybuyapi.adaptable.app/api/v1/profile/monify",config);
    return data;
}
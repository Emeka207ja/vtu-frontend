import axios from "axios"
import { vtpassHeaderfn } from "@/Services/utilityFn";
import { payApi } from "@/api-folder/vtpass";
import { iAuth } from "../Wassce/service";

export interface idetails{
    request_id: string;
    serviceID: string;
    billersCode: string;
    variation_code: string;
    amount: number;
    phone:string
}

export interface  iDataStore{
    serviceID: string;
    phone: string;
    amount: number;
    request_id: string;
}
export const getDataVars = async(vars:string) => {
    const { data } = await axios.get(` https://sandbox.vtpass.com/api/service-variations?serviceID=${vars
}`)
    return data;
}

export const dataSubHandler = async (auth: iAuth, details: idetails) => {
    const config = vtpassHeaderfn(auth)
    console.log(details)

    const { data } = await axios.post(payApi, details, config);
    return data;
}

export const storeDataSub = async (token: string, detail: iDataStore) => {
    const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization: `Bearer ${token.slice(1,-1)}`
        }
    }
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/airtime/vtdata",detail,config);
    return data;
}
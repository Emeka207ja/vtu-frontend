import axios from "axios"
import { vtpassHeaderfn } from "@/Services/utilityFn";
import { payApi } from "@/api-folder/vtpass";
import { iAuth } from "../Wassce/service";
import { vtpassBaseApi } from "@/api-folder/auth";
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
    const { data } = await axios.get(`${vtpassBaseApi}/service-variations?serviceID=${vars
}`)
    return data;
}

export const dataSubHandler  = async (auth: iAuth, details: idetails) => {
    const config = vtpassHeaderfn(auth)
    console.log(details)

    const { data } = await axios.post(`${vtpassBaseApi}/pay`, details, config);
    return data;
}

export const storeDataSub = async (token: string, detail: iDataStore) => {
    const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization:`Bearer ${Token}`
        }
    }
    console.log(detail)
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/airtime/vtdata",detail,config);
    return data;
}
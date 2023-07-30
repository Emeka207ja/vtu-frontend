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
    phone:number
}

export const getDataVars = async(vars:string) => {
    const { data } = await axios.get(` https://sandbox.vtpass.com/api/service-variations?serviceID=${vars
}`)
    return data;
}

export const dataSubHandler = async (auth: iAuth, details: idetails) => {
    const config = vtpassHeaderfn(auth)

    const { data } = await axios.post(payApi, details, config);
    return data;
}
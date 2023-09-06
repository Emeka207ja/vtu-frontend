import { payApi } from "@/api-folder/vtpass";
import { icarInsureData } from "../iInsurance";
import axios from "axios"
import { iAuth } from "@/Components/Wassce/service";
import { vtpassHeaderfn } from "@/Services/utilityFn";

export interface idetails extends Omit<icarInsureData, "phone">{
    phone: string;
    billersCode: string;
    amount?: number;
    serviceID: string;
    request_id:string
}

export interface iCar{
    product_name:string;
    requestId:string;
    certUrl:string;
    amount:number
}


export const carInsuranceHandler = async (auth:iAuth,details:idetails) => {
    const config = vtpassHeaderfn(auth)
    const { data } = await axios.post(payApi, details, config);
    return data
}
export const storeCarInsurance = async (token:string,details:iCar) => {
     const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization :`Bearer ${Token}`
        }
    }
    const { data } =await axios.post("https://easybuyapi.adaptable.app/api/v1/insurance/vehicle", details, config);
    return data
}
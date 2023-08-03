import { payApi } from "@/api-folder/vtpass";
import { icarInsureData } from "../iInsurance";
import axios from "axios"
import { iAuth } from "@/Components/Wassce/service";
import { vtpassHeaderfn } from "@/Services/utilityFn";

export interface idetails extends Omit<icarInsureData, "phone">{
    phone: string;
    billersCode: string;
    amount: number;
    serviceID: string;
    request_id:string
}


export const carInsuranceHandler = async (auth:iAuth,details:idetails) => {

    const config = vtpassHeaderfn(auth)
    console.log(config)

    const { data } =await axios.post(payApi, details, config);
    return data
}
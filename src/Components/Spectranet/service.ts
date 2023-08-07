import axios from "axios"
import { payApi } from "@/api-folder/vtpass";
import { vtpassHeaderfn } from "@/Services/utilityFn";
import { iAuth } from "../Wassce/service";
export interface idetails{
    request_id: string;
    billersCode: string;
    phone: string;
    quantity: number;
    variation_code: string;
    serviceID: string;
    amount:number
    
}


export const fetchVars = async () => {
    const { data } = await axios.get("https://sandbox.vtpass.com/api/service-variations?serviceID=spectranet")
    return data;
}


export const purchaseHandler = async (auth:iAuth,detail:idetails) => {
    const config = vtpassHeaderfn(auth);
    const { data } = await axios.post(payApi, detail, config);
    return data;
}
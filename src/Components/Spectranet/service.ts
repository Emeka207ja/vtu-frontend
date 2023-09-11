import axios from "axios"
import { payApi } from "@/api-folder/vtpass";
import { vtpassHeaderfn } from "@/Services/utilityFn";
import { iAuth } from "../Wassce/service";
import { vtpassBaseApi } from "@/api-folder/auth";
export interface idetails{
    request_id: string;
    billersCode: string;
    phone: string;
    quantity: number;
    variation_code: string;
    serviceID: string;
    amount:number
    
}

export interface ispectranet{
    requestId:string,
    amount:number,
    phone:string,
    purchased_code:string,
    product_name:string
}


export const fetchVars = async () => {
    const { data } = await axios.get(`${vtpassBaseApi}/service-variations?serviceID=spectranet`)
    return data;
}


export const purchaseHandler = async (auth:iAuth,detail:idetails) => {
    const config = vtpassHeaderfn(auth);
    const { data } = await axios.post(`${vtpassBaseApi}/pay`, detail, config);
    return data;
}

export const storeSpectranet = async (token:string,details:ispectranet) => {
     const config = {
        headers: {
            Authorization: `Bearer ${token.slice(1,-1)}`
        }
    }

    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/smile/spectranet", details, config);
    return data
}
import { payApi } from "@/api-folder/vtpass";
import axios from "axios"

export interface idata{
    request_id: string;
    serviceID: string;
    variation_code: string;
    // amount: number;
    phone: number;
    quantity: number;
}

export interface iAuth{
    secret_key: string;
    api_key:string
}

export interface iEducation{
    product_name:string;
    requestId:string;
    purchased_code:string;
    amount:number
}


export const paymentHandler = async (auth: iAuth, details: idata) => {
    const { secret_key, api_key } = auth;

    const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
    }

    const { data } = await axios.post(payApi, details, config)
    return data
}

export const storeEducation = async (token:string,detail:iEducation) => {
    const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization: `Bearer ${token.slice(1,-1)}`
        }
    }
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/education",detail,config);
    return data;
}
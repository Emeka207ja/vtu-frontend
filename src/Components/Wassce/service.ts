import { payApi } from "@/api-folder/vtpass";
import axios from "axios"

export interface idata{
    request_id: string;
    serviceID: string;
    variation_code: string;
    amount: number;
    phone: number;
    quantity: number;
}

export interface iAuth{
    secret_key: string;
    api_key:string
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
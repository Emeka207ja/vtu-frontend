import axios from "axios"
import { config } from "process";

interface iReq{
    amount: number;
    phone: number,
    request_id: string;
    serviceID: string;
    api_key: string;
    secret_key: string;
    billersCode: string,
    variation_code:string
}

export const subElectricity = async (details:iReq) => {
    const { secret_key, api_key,amount,request_id,billersCode,phone,serviceID,variation_code } = details

    const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
   }

    const { data } = await axios.post("https://sandbox.vtpass.com/api/pay", { request_id, serviceID, billersCode, variation_code, amount, phone }, config)
    return data;
}
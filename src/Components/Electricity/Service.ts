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

 interface iPrepaid{
     mainToken: string;
     purchased_code: string;
    requestId: string;
    date: string;
    utilityName: string;
    amount: number;

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


export const subPrepaid = async (accessToken: string, details: iPrepaid) => {
    const config = {
            headers: {
                Authorization :`Bearer ${accessToken?.slice(1,-1)}`
            }
        }
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/electricity/prepaid", details, config)
    return data
}
import axios from "axios"
// import { headers } from "next/dist/client/components/headers";
import { iCar } from "../Insurance/Car/service";
import { vtpassBaseApi } from "@/api-folder/auth";
export interface ismile{
    requestId:string,
    amount:number,
    phone:string
}

export const getVariationCode = async () => {
    const { data } = await axios.get(`${vtpassBaseApi}/service-variations?serviceID=smile-direct`);
    return data
}
export const verifySmile = async (billersCode: string, serviceID: string, api_key: string, secret_key: string) => {
     const config = {
            headers: {
               " api-key": api_key,
                "secret-key": secret_key
            }
        }
    const { data } = await axios.post(`${vtpassBaseApi}/merchant-verify/smile/email`,{billersCode,serviceID},config);
    return data
}


export const purchaseSmile = async (
    request_id: string,
    serviceID: string,
    billersCode: string,
    variation_code: string,
    amount: number,
    phone: string,
    api_key: string,
    secret_key:string
) => {
    // console.log(api_key,secret_key)
     const config = {
            headers: {
               " api-key": api_key,
                "secret-key": secret_key
            }
        }
    const { data } = await axios.post(`${vtpassBaseApi}/pay`, { request_id, serviceID, billersCode, variation_code, amount, phone }, config)
    return data
}

export const storeSmile = async (token:string,details:ismile) => {
     const config = {
        headers: {
            Authorization: `Bearer ${token.slice(1,-1)}`
        }
    }

    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/smile", details, config);
    return data
}
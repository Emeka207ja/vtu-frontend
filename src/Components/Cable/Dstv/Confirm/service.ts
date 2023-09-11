import axios from "axios"
import { vtpassBaseApi } from "@/api-folder/auth";
interface iData{
    request_id: string;
    serviceID: string;
    billersCode: string
    
    amount: number;
    phone: string;
    subscription_type:string
}
interface iNew extends iData{
    variation_code: string;
}
interface iAuth{
    api_key: string;
    secret_key:string
}

export interface idstvStore{
    phone:string;
    requestId:string;
    amount: number;
}


export const newSub = async (auth: iAuth, vals: iNew) => {
    
     const {api_key,secret_key} = auth
    const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
    }
   
    const { data } = await axios.post(`${vtpassBaseApi}/pay`, vals, config)
    return data;
}
export const renewSub = async (auth: iAuth, vals: iData) => {

     const {api_key,secret_key} = auth
    const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
    }
   
    const { data } = await axios.post(`${vtpassBaseApi}/pay`, vals, config)
    return data;
}

export const storeDstv = async (token:string,details:idstvStore,urlPath:string) => {
     const config = {
        headers: {
            Authorization: `Bearer ${token.slice(1,-1)}`
        }
    }

    const { data } = await axios.post(`https://easybuyapi.adaptable.app/api/v1/${urlPath}`, details, config);
    return data
}
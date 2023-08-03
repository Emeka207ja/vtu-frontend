import axios from "axios"
import { iAuth } from "@/Components/Wassce/service";
import { payApi } from "@/api-folder/vtpass";

export interface iData {
    request_id: string
    serviceID: string
    billersCode:string
    variation_code: string
    amount:number
    phone: string
    full_name: string
    address: string
    type_building: string
    business_occupation: string
    date_of_birth: string
    
}


export const getOptionType = async (type:string,serviceID:string) => {
    const { data } = await axios.get(`https://sandbox.vtpass.com/api/options?serviceID=${serviceID}&name=${type}`)
    return data;
}

export const homeinsureHandler = async (auth: iAuth, details: iData) => {
    console.log(details)
    const { api_key, secret_key } = auth
     const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
    }
    const { data } = await axios.post(payApi, details, config)
    return data
}
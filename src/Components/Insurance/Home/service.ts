import axios from "axios"
import { iAuth } from "@/Components/Wassce/service";
import { payApi } from "@/api-folder/vtpass";
import { vtpassBaseApi } from "@/api-folder/auth";
export interface iData {
    request_id: string
    serviceID: string
    billersCode:string
    variation_code: string
    amount?:number
    phone: string
    full_name: string
    address: string
    type_building: string
    business_occupation: string
    date_of_birth: string
    
}
export interface iHomeInsurance{
    product_name:string,
    requestId:string,
    total_amount:number
}


export const getOptionType = async (type:string,serviceID:string) => {
    const { data } = await axios.get(`${vtpassBaseApi}/options?serviceID=${serviceID}&name=${type}`)
    return data;
}

export const homeinsureHandler = async (auth: iAuth, details: iData) => {
    
    const { api_key, secret_key } = auth
     const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
    }
    const { data } = await axios.post(`${vtpassBaseApi}/pay`, details, config)
    return data
}
export const storeHomeinsurance = async (token:string, details: iHomeInsurance) => {
    const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization :`Bearer ${Token}`
        }
    }
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/insurance/home", details, config)
    return data
}
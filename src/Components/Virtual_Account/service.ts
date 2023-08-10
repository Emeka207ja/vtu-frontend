import axios from "axios"

export interface isquad{
    customer_identifier: string;
    business_name: string
    mobile_num: string;
    bvn: string;
    beneficiary_account: string
}

export interface idetail{
    name: string;
    email:string
}
import { getProfileApi } from "@/api-folder/profile";


export const genVirtualAccount = async (id:string,name:string) => {
    const config = {
        headers: {
            Authorization: `Bearer sk_test_ELx4sYdpg3zJaD65yJ7VkSjmHZ3BqzLtmJnphxgj`
        }
    }
    const datax = {
        "account_name": name,
        "account_reference": id,
        "permanent": true,
        "bank_code": "035",
        "customer": {
            "name": name
        }
    }
    const { data } = await axios.post("https://api.korapay.com/merchant/api/v1/virtual-bank-account", datax, config)
    return data
}

export const squadAcct = async (auth: string, val: isquad) => {
    const config = {
        headers :{
            Authorization :`Bearer ${auth}`
        }
    }
    
    const { data } = await axios.post("https://sandbox-api-d.squadco.com/virtual-account/business", val, config)
    return data;
}

export const getSquadAuth = async () => {
    const { data } = await axios.get("https://easybuyapi.adaptable.app/api/v1/auth/squad_acct")
    return data;
}

export const getProfile = async (token:string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token.slice(1,-1)}`
        }
    }
    const { data } = await axios.get(getProfileApi, config)
    return data;
}

export const acountHandler = async (amount: number, detail: idetail,id:string) => {
    const payload = {
        account_name: "Allpoint",
        amount: amount,
        currency: "NGN",
        reference:id,
        customer:detail
    }
    const config = {
        headers: {
            Authorization: `Bearer sk_live_QQazfziwwW6nF29vmUuM2tN8TDKdbYTvYY63q3YH`
        }
    }
    
    const { data } = await axios.post("https://api.korapay.com/merchant/api/v1/charges/bank-transfer", payload, config)
    return data
}

export const storeRefId = async (reference: string,token:string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token.slice(1,-1)}`
        }
    }
    const val = {
        reference
    }
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/profile/storekoraid", val, config)
    return data;
}
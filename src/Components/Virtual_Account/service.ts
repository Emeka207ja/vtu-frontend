import axios from "axios"

export interface isquad{
    customer_identifier: string;
    business_name: string
    mobile_num: string;
    bvn: string;
    beneficiary_account: string
}


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
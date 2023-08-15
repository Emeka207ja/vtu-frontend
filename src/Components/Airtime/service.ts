import axios from "axios"

export interface  iairtimePurchase{
    network: string;
    phone: string;
    Amount: number;
    order_id: string;
}

export const getHeaders = async () => {
    const { data } = await axios.get("https://easybuyapi.adaptable.app/api/v1/auth/vtpass_header");
    return data
}

export const stroreAirtime = async (token: string, detail: iairtimePurchase) => {
    const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization: `Bearer ${token.slice(1,-1)}`
        }
    }
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/airtime",detail,config);
    return data;
}
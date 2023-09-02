import axios from "axios"

export const getFailedTransaction = async (service: string,token:string) => {
    const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
    const { data } = await axios.get(`https://easybuyapi.adaptable.app/api/v1/data/failed/${service}`, config);
    return data;
}
export const refundTransaction = async (requestId: string, username:string, token:string) => {
    const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
    const { data } = await axios.get(`https://easybuyapi.adaptable.app/api/v1/data/refund/${requestId}/${username}`, config);
    return data;
}
export const cancelrefundTransaction = async (requestId: string, username:string, token:string) => {
    const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
    const { data } = await axios.get(`https://easybuyapi.adaptable.app/api/v1/data/cancelrefund/${requestId}/${username}`, config);
    return data;
}
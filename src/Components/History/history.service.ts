import axios from "axios"

export const getAirtimeHistory = async(accessToken:string)=>{
        const config = {
            headers: {
                Authorization :`Bearer ${accessToken?.slice(1,-1)}`
            }
        }

        const {data} = await axios.get("https://easybuyapi.adaptable.app/api/v1/airtime",config)
        return data;
}
    
export const debitP2p = async (accessToken: string) => {
     const config = {
            headers: {
                Authorization :`Bearer ${accessToken?.slice(1,-1)}`
            }
        }
    const { data } = await axios.get("https://easybuyapi.adaptable.app/api/v1/peer/debit",config)
    return data
}

export const creditP2p = async (accessToken: string) => {
     const config = {
            headers: {
                Authorization :`Bearer ${accessToken?.slice(1,-1)}`
            }
        }
    const { data } = await axios.get("https://easybuyapi.adaptable.app/api/v1/peer/credit",config)
    return data
}
export const cableHistory = async (accessToken: string) => {
     const config = {
            headers: {
                Authorization :`Bearer ${accessToken?.slice(1,-1)}`
            }
        }
    const { data } = await axios.get("https://easybuyapi.adaptable.app/api/v1/cable",config)
    return data
}
import axios from "axios"
import { useCallback } from "react"
import { useAppSelector } from "@/redux/hooks"
// import { Data as airtime } from "@/Components/Airtime"

interface airtime{
    network: string;
    Amount: number;
    phone: string,
    order_id: string,
    accessToken:string|null
}

interface cable{
    username: string;
    password: string;
    smartcard: string;
    variation_id: string;
    phone: string;
    service_id: string;
}

interface storesub extends cable{
    amount:number
}







 export async function airtimeUpdate(details: airtime) {
  
    const { Amount, network, phone, order_id, accessToken } = details
      const config = {
          headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
    }
    console.log(accessToken)
    try {
        const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/airtime",{network,phone,Amount,order_id},config)
        return data
    } catch (error) {
        console.log(error);
    }
}


export const purchaseAirtime = async (Amount: number, phone: string, network: string,username:string,password:string) => {
   
    const { data } = await axios.get(`https://vtu.ng/wp-json/api/v1/airtime?username=${username}&password=${password}&phone=${phone}&network_id=${network}&amount=${Amount}`)

    return data
    
}



  export const buyData = async (username:string,password:string,Phone:string,network:string,selectedPlan:string) => {      
        const {data} = await axios.get(`https://vtu.ng/wp-json/api/v1/data?username=${username}&password=${password}&phone=${Phone}&network_id=${network}&variation_id=${selectedPlan}`)    

        return data
    }
    

 export const storePurchase = async (network: string, phone: string, Amount: number, order_id: number,accessToken:string) => {
        const config = {
            headers: {
                Authorization :`Bearer ${accessToken?.slice(1,-1)}`
            }
        }
        const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/airtime",{network,phone,Amount,order_id},config)
}

export const subCable = async (val:cable) => {
    const { data } = await axios.get(`https://vtu.ng/wp-json/api/v1/tv?username=${val.username}&password=${val.password}&phone=${val.phone}&service_id=${val.service_id}&smartcard_number=${val.smartcard}&variation_id=${val.variation_id}`)
    return data
}

export const storeCableSub = async (val: storesub, accessToken: string) => {
     const config = {
            headers: {
                Authorization :`Bearer ${accessToken?.slice(1,-1)}`
            }
        }
    const {data} = await axios.post("https://easybuyapi.adaptable.app/api/v1/cable",val,config)
}


export const authSmartcard = async (username:string,password:string,smartcard:string,service_id:string) => {
    const { data } = await axios.get(`https://vtu.ng/wp-json/api/v1/verify-customer?username=${username}&password=${password}&customer_id=${smartcard}&service_id=${service_id}`)
    return data
}
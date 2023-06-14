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
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
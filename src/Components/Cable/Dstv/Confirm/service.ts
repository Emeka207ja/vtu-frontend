import axios from "axios"

interface iData{
    request_id: string;
    serviceID: string;
    billersCode: string
    
    amount: number;
    phone: number;
    subscription_type:string
}
interface iNew extends iData{
    variation_code: string;
}
interface iAuth{
    api_key: string;
    secret_key:string
}


export const newSub = async (auth: iAuth, vals: iNew) => {
    
     const {api_key,secret_key} = auth
    const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
    }
   
    const { data } = await axios.post("https://sandbox.vtpass.com/api/pay", vals, config)
    return data;
}
export const renewSub = async (auth: iAuth, vals: iData) => {

     const {api_key,secret_key} = auth
    const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
    }
   
    const { data } = await axios.post("https://sandbox.vtpass.com/api/pay", vals, config)
    return data;
}
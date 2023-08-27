import axios from "axios"

interface iData{
    request_id: string;
    serviceID: string;
    amount: number;
    phone: string;
     variation_code: string;
}

interface iAuth{
    api_key: string;
    secret_key:string
}

export interface istoreShowmax{
    requestId:string;
    product_name:string;
    phone:string;
    purchased_code:string;
    amount: number;
}


export const newSub = async (auth: iAuth, vals: iData) => {
    
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

export const storeShowmax = async (token:string,details:istoreShowmax) => {
     const config = {
        headers: {
            Authorization: `Bearer ${token.slice(1,-1)}`
        }
    }

    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/showmax", details, config);
    return data
}

import axios from "axios"

export interface idetails{
    plan: string;
    number : string;
    reference : string;
}
interface iauth{
    token:string
}

export interface ipurchase{
    phone: string;
    price:number
}









export const dataSubHandler = async (auth: iauth, details: idetails) => { 
    const {token} = auth
    const config = {
        headers: {
            Authorization :`Bearer ${token}`
        }
    }
    
    const { data } = await axios.post("https://us-central1-paybills-d74e3.cloudfunctions.net/app/api/apibuydata", details, config);
    return data;
}

export const getOptions = async (token: string, type: string) => {
    
    const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
    
    const { data } = await axios.get(`https://easybuyapi.adaptable.app/api/v1/data/${type}`, config)
    return data;
}



export const getToken = async () => {
    const { data } = await axios.get("https://easybuyapi.adaptable.app/api/v1/auth/geotop");
    return data;
}

export const purchaseDataHandler = async (token: string, details: ipurchase) => {
   
    const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
     console.log(config)
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/data/buydata", details, config);
    return data;

}

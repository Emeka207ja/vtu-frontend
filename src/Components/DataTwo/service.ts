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
    price: number;
    requestId:string
}
export interface idebit {
   requestId :string;
   service:string;
   amount:number
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
    const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization :`Bearer ${Token}`
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
   const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization :`Bearer ${Token}`
        }
    }
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/data/buydata", details, config);
    return data;

}
export const debitHandler = async (token: string, details: idebit) => {
    const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization :`Bearer ${Token}`
        }
    }
    
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/profile/debitaccount", details, config);
     console.log(data)
    return data;

}

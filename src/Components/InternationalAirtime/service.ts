import axios from "axios"
import { payApi } from "@/api-folder/vtpass";
import { vtpassHeaderfn } from "@/Services/utilityFn";
import { iAuth } from "../Wassce/service";



export interface iDetails{
    request_id: string;
    billersCode: string;
    serviceID: string;
    variation_code: string;
    operator_id: string;
    product_type_id: string;
    country_code: string;
    amount: number;
    phone: string;
    email: string;
}

export const getCountries = async () => {
    const { data } = await axios.get("https://api-service.vtpass.com/api/get-international-airtime-countries")
    return data;
}

export const getOptions = async (id: string) => {
    const { data } = await axios.get(` https://api-service.vtpass.com/api/get-international-airtime-product-types?code=${id}`);
    return data;
}
export const getOperator = async (code: string,id:string) => {
    const { data } = await axios.get(` https://api-service.vtpass.com/api/get-international-airtime-operators?code=${code}&product_type_id=${id}`);
    return data;
}
export const getOperatorType = async (id: string, type: string) => {
    // const idx:number = id.length > 0 ? parseFloat(id) : 1;
    // const typex:number= type.length > 0 ?  parseFloat(type) : 1;
    const { data } = await axios.get(`https://api-service.vtpass.com/api/service-variations?serviceID=foreign-airtime&operator_id=${id}&product_type_id=${type}`);
    return data;
}

export const purchaseDataHandler = async (auth:iAuth,details:iDetails) => {
    const config = vtpassHeaderfn(auth);
    const { data } = await axios.post(payApi, details, config);
    return data;
}
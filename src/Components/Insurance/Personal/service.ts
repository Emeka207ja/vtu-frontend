import { iPersonal } from "./iPersonal";
import { iAuth } from "@/Components/Wassce/service";
import axios from "axios"
import { payApi } from "@/api-folder/vtpass";
import { vtpassBaseApi } from "@/api-folder/auth";
export interface idetails extends Omit<iPersonal,"phone">{
    amount: number;
    serviceID: string;
    request_id: string;
    billersCode:string
    phone: string;
}


export const payPersonal = async (auth:iAuth,details:idetails) => {
    const { api_key, secret_key } = auth

    const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
    }

    const { data } = await axios.post(`${vtpassBaseApi}/pay`, details, config);
    return data;
}
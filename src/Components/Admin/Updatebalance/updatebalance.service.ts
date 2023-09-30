import { baseUrl } from "@/api-folder/auth";
import axios from "axios"
import { localUrl } from "@/api-folder/auth";

export enum balanceUpdateType{
    ADDITION= "add",
    SUBSTRACTION = "minus"
}
export interface ipayload {
    type: string,
    amount:number
}

export const getUser = async (name: string, token: string) => {
    const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization :`Bearer ${Token}`
        }
    }
    const { data } = await axios.post(`${baseUrl}/admin/getuser`,{name},config)
    return data
}
export const updateBalance = async (id:string, token: string,payload:ipayload) => {
    const Token = token.replace(/"/g, '')
    const config = {
        headers: {
            Authorization :`Bearer ${Token}`
        }
    }
    console.log(payload)
    const { data } = await axios.patch(`${baseUrl}/admin/updateuserbalance/${id}`,payload,config)
    return data
}
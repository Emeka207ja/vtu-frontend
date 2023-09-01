import { iProfile } from "@/redux/interface/profileInterface"

// export  interface idata{
//     service: string;
//     success: string;
//     username:string
// }
export  interface idata{
    amount:number
    created_at:string
    id:number
    profile:iProfile
    requestId:string
    service:string
    success:string
    updated_at:string

}
        
    
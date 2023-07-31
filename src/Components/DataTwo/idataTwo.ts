import { iProvider } from "../Data/iProfvider";


export const providerData: iProvider[] = [
    {
        name: "Airtel CG",
        image: "/assets/images/Airtel-Data.jpg"
    },
    {
        name: "MTN CG",
        image: "/assets/images/MTN-Data.jpg"
    },
    {
        name: "MTN SME",
        image: "/assets/images/MTN-Data.jpg"
    },
    {
        name: "Glo Gifting",
        image: "/assets/images/gloD.jpg"
    },
    {
        name: "Glo CG",
        image: "/assets/images/gloD.jpg"
    },
]

export interface iformdata{
    Airtel_CG: boolean;
    MTN_CG: boolean;
    MTN_SME:boolean
    Glo_Gifting: boolean;
    Glo_CG: boolean;
}

export const formdata: iformdata = {
    Airtel_CG: false,
    MTN_CG: false,
    Glo_Gifting: false,
    Glo_CG: false,
    MTN_SME:false
}

export interface ioptions{
    created_at:string
    id:number
    name:string
    network:string
    plan_id:string
    price:number
    size:string
    updated_at:string
}
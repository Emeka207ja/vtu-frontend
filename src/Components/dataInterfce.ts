
export interface Network{
    id: string;
    provider: string,
    network_id:string
}

export const network: Network[] = [
     {
        id: "mtn",
        provider: "MTN",
        network_id:"mtn"    
    },
     {
        id: "glo",
        provider: "GLO",
        network_id:"glo"    
    },
     {
        id: "airtel",
        provider: "Airtel",
        network_id:"airtel"    
    },
     {
        id: "9mobile",
        provider: "9Mobile",
        network_id:"9mobile"    
    },
]

export interface Plans{
    id: string;
    plan: string;
    variation_id: string;
}

export const mtn: Plans[] = [
    {
        id: "mtn",
        plan: " MTN SME Data 500MB  30 Days",
        variation_id:"500"
    },
    {
        id: "mtn",
        plan: " MTN SME Data 1GB  30 Days",
        variation_id:"M1024"
    },
    {
        id: "mtn",
        plan: " MTN SME Data 2GB  30 Days",
        variation_id:"M2024"
    },
    {
        id: "mtn",
        plan: " MTN SME Data 3GB  30 Days",
        variation_id:"3000"
    },
    {
        id: "mtn",
        plan: " MTN SME Data 5GB  30 Days",
        variation_id:"5000"
    },
]

export const glo: Plans[] = [
      {
        id: "glo",
        plan: " Glo Data 1GB  5 Nights",
        variation_id:"glo100x"
    },
    {
        id: "glo",
        plan: "Glo Data 1.25GB  1 Day (Sunday)",
        variation_id:"glo200x"
    },
    {
        id: "glo",
        plan: "Glo Data 1.35GB  14 Days",
        variation_id:"G500"
    },
    {
        id: "glo",
        plan: "Glo Data 5.8GB  30 Days",
        variation_id:"G2000"
    },
]

export const airtel: Plans[] = [
    {
        id: "airtel",
        plan: " Airtel Data 500MB (Gift) 30 Days",
        variation_id:"AIRTEL500MB"
    },
    {
        id: "airtel",
        plan: "Airtel Data 1GB (Gift)  30 Days",
        variation_id:"AIRTEL1GB"
    },
    {
        id: "airtel",
        plan: "Airtel Data 2GB (Gift) 30 Days",
        variation_id:"AIRTEL2GB"
    },
    {
        id: "airtel",
        plan: "Airtel Data 5GB (Gift) 30 Days",
        variation_id:"AIRTEL5GB"
    },
]

export const mobile: Plans[] = [
    {
        id: "9mobile",
        plan: "9mobile Data 1GB  30 Days",
        variation_id:"9MOB1000"
    },
    {
        id: "9mobile",
        plan: "9mobile Data 2.5GB 30 Days",
        variation_id:"9MOB34500"
    },
    {
        id: "9mobile",
        plan: "9mobile Data 11.5GB  30 Days",
        variation_id:"9MOB8000"
    },
    {
        id: "9mobile",
        plan: "9mobile Data 15GB  30 Days",
        variation_id:"9MOB5000"
    },
]
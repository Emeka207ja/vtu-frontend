export interface iDistributor{
    key: string;
    serviceId: string;
    name:string
}

export interface imeterUser{
    Address:string
    Customer_District:string
    Customer_Name:string
    Meter_Number:number
}

export const distributor: iDistributor[] = [
    {
        key: "IKEDC",
        serviceId: "ikeja-electric",
        name: "Ikeja Electricity"
    },
    {
        key: "EKEDC",
        serviceId: "eko-electric",
        name: "Eko Electricity"
    },
    {
        key: "KEDCO",
        serviceId: "kano-electric",
        name: "Kano Electricity"
    },
    {
        key: "PHED",
        serviceId: "portharcourt-electric",
        name: "Port Harcourt Electricity"
    },
    {
        key: "JED",
        serviceId: "jos-electric",
        name: "Jos Electricity"
    },
    {
        key: "KAEDCO",
        serviceId: "kaduna-electric",
        name: "Kaduna Electricity"
    },
    {
        key: "IBEDC",
        serviceId: "ibadan-electric",
        name: "Ibadan Electricity"
    },
    {
        key: "AEDC",
        serviceId: "abuja-electric",
        name: "Abuja Electricity"
    },
    {
        key: "EEDC",
        serviceId: "enugu-electric",
        name: "Enugu Electricity"
    },
    {
        key: "BEDC",
        serviceId: "benin-electric",
        name: "Benin Electricity"
    },
]
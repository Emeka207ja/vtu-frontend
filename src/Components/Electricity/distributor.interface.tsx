export interface iDistributor{
    key: string;
    serviceId: string;
    name:string
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
        serviceId: "ikeja-electricity",
        name: "Port Harcourt Electricity"
    },
    {
        key: "JED",
        serviceId: "ikeja-electricity",
        name: "Jos Electricity"
    },
    {
        key: "KAEDCO",
        serviceId: "ikeja-electricity",
        name: "Kaduna Electricity"
    },
    {
        key: "IBEDC",
        serviceId: "ikeja-electricity",
        name: "Ibadan Electricity"
    },
    {
        key: "AEDC",
        serviceId: "ikeja-electricity",
        name: "Abuja Electricity"
    },
    {
        key: "EEDC",
        serviceId: "ikeja-electricity",
        name: "Enugu Electricity"
    },
    {
        key: "BEDC",
        serviceId: "ikeja-electricity",
        name: "Benin Electricity"
    },
]
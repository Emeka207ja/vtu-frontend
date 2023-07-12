

interface iProvider{
    name: string;
    image: string;
}

export const provider: iProvider[] = [
    {
        name: "Airtel Data",
        image: "/assets/images/Airtel-Data.jpg"
    },
    {
        name: "MTN Data",
        image: "/assets/images/MTN-Data.jpg"
    },
    {
        name: "9mobile Data",
        image: "/assets/images/9mobile-Data.jpg"
    },
    {
        name: "Glo Data",
        image: "/assets/images/gloD.jpg"
    },
   
]

export interface iVar{
    variation_code: string
    name: string,
    variation_amount: string,
    fixedPrice: string
}
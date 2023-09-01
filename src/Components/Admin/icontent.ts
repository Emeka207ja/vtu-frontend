
export interface icontent{
    name: string;
    id:string
}

export const contentData: icontent[] = [
    {
        name: "Wallets",
        id:"wallet"
    },
    {
        name: "Users",
        id:"users"
    },
    {
        name: "Transactions",
        id:"transactions"
    },
    {
        name: "Data",
        id:"data"
    },
    {
        name: "Failed Transactions",
        id:"refund"
    }
]
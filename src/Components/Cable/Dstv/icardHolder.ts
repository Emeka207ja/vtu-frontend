

export interface iHolder{
    Customer_Name: string;
    Status: string;
    DUE_DATE: string;
    Customer_Number: number;
    Customer_Type: string;
    Current_Bouquet: string;
    Current_Bouquet_Code: string;
    Renewal_Amount: number;
    error?:string
}

export interface idstvHolder{
    accountStatus:string
    amount:number
    customerNumber:string
    customerType:string
    dueDate:string
    firstName:string
    invoicePeriod:number
    lastName:string
}

export interface iOldDstvSub {
    code:string
    description:string
    name:string
    price:number
}
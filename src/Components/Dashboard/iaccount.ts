export interface iMonnyfyAccount{
    bankCode: string;
    bankName:string;
    accountNumber: string;
    accountName: string
}

export interface iStoreMonnify extends iMonnyfyAccount{
    accountReference:string
}
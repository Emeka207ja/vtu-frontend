export interface iLabel{
    image:string
}

export interface iCountry{
    code: string;
    name: string;
    flag: string;
    currency: string;
    prefix:string
}

export interface idata{
    country: string;
    product_type: string
    operator_id:string
}


export const intData: idata = {
    country: "",
    product_type: "",
    operator_id:""
}


export interface ioption{
    product_type_id: number;
    name: string
}

export interface ioperator{
    operator_id: string;
    name: string;
    operator_image: string;
}

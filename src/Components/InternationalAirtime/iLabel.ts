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
    operator_id: string;
    operator_type:string
}


export const intData: idata = {
    country: "",
    product_type: "",
    operator_id: "",
    operator_type:""
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


export interface ioperatorType{
    charged_amount:null
    charged_currency:string

    fixedPrice:string

    name:string

    variation_amount:string

    variation_amount_max:number

    variation_amount_min:number

    variation_code:string

    variation_rate:number

}

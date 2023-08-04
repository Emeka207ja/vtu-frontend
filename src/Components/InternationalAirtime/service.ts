import axios from "axios"

export const getCountries = async () => {
    const { data } = await axios.get("https://api-service.vtpass.com/api/get-international-airtime-countries")
    return data;
}

export const getOptions = async (id: string) => {
    const { data } = await axios.get(` https://api-service.vtpass.com/api/get-international-airtime-product-types?code=${id}`);
    return data;
}
export const getOperator = async (code: string,id:string) => {
    const { data } = await axios.get(` https://api-service.vtpass.com/api/get-international-airtime-operators?code=${code}&product_type_id=${id}`);
    return data;
}
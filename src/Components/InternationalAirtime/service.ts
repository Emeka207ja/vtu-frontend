import axios from "axios"

export const getCountries = async () => {
    const { data } = await axios.get("https://sandbox.vtpass.com/api/get-international-airtime-countries")
    return data;
}
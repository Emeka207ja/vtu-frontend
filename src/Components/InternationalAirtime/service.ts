import axios from "axios"

export const getCountries = async () => {
    const { data } = await axios.get("https://api-service.vtpass.com/api/get-international-airtime-countries")
    return data;
}
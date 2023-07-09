import axios from "axios"


export const fetchVars = async () => {
    const { data } = await axios.get("https://sandbox.vtpass.com/api/service-variations?serviceID=spectranet")
    return data;
}
import axios from "axios"



export const getOptionType = async (type:string,serviceID:string) => {
    const { data } = await axios.get(`https://sandbox.vtpass.com/api/options?serviceID=${serviceID}&name=${type}`)
    return data;
}
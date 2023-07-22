import axios from "axios"

export const getDataVars = async(vars:string) => {
    const { data } = await axios.get(` https://sandbox.vtpass.com/api/service-variations?serviceID=${vars
}`)
    return data;
}
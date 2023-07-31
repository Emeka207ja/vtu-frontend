import axios from "axios"


export const getOptions = async (token: string, type: string) => {
    
      const config = {
        headers: {
            Authorization :`Bearer ${token?.slice(1,-1)}`
        }
    }
    
    const { data } = await axios.get(`https://easybuyapi.adaptable.app/api/v1/data/${type}`, config)
    return data;
}
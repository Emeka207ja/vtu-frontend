import axios from "axios"

export const getHeaders = async () => {
    const { data } = await axios.get("https://easybuyapi.adaptable.app/api/v1/auth/vtpass_header");
    return data
}
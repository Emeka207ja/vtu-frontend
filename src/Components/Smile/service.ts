import axios from "axios"
import { headers } from "next/dist/client/components/headers";

export const getVariationCode = async () => {
    const { data } = await axios.get(" https://sandbox.vtpass.com/api/service-variations?serviceID=smile-direct");
    return data
}
export const verifySmile = async (billersCode: string, serviceID: string, api_key: string, secret_key: string) => {
     const config = {
            headers: {
               " api-key": api_key,
                "secret-key": secret_key
            }
        }
    const { data } = await axios.post("https://sandbox.vtpass.com/api/merchant-verify/smile/email",{billersCode,serviceID},config);
    return data
}
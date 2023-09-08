import axios from "axios"

interface iData{
    api_key: string;
    secret_key:string
}

// export const subElectricity = async (details:iReq) => {
//     const { secret_key, api_key,amount,request_id,billersCode,phone,serviceID,variation_code } = details

//     const config = {
//         headers: {
//             " api-key": api_key,
//             "secret-key": secret_key
//         }
//    }

//     const { data } = await axios.post("https://sandbox.vtpass.com/api/pay", { request_id, serviceID, billersCode, variation_code, amount, phone }, config)
//     return data;
// }

export const verifySmartCard = async (card: string, datax: iData,serviceID:string,type?:string) => {
    const {api_key,secret_key} = datax
    const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
    }
    const billersCode = parseFloat(card)
    const { data } = await axios.post("https://sandbox.vtpass.com/api/merchant-verify", { billersCode,serviceID }, config)
    return data
}
export const verifyMeter = async (card: string, datax: iData,serviceID:string,type:string) => {
    const {api_key,secret_key} = datax
    const config = {
        headers: {
            " api-key": api_key,
            "secret-key": secret_key
        }
    }
    const billersCode = parseFloat(card)
    const { data } = await axios.post("https://sandbox.vtpass.com/api/merchant-verify", { billersCode,serviceID,type }, config)
    return data
}
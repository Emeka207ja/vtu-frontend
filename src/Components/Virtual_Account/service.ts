import axios from "axios"

export const genVirtualAccount = async (id:string,name:string) => {
    const config = {
        headers: {
            Authorization: `Bearer sk_test_ELx4sYdpg3zJaD65yJ7VkSjmHZ3BqzLtmJnphxgj`
        }
    }
    const datax = {
        "account_name": name,
        "account_reference": id,
        "permanent": true,
        "bank_code": "035",
        "customer": {
            "name": name
        }
    }
    const { data } = await axios.post("https://api.korapay.com/merchant/api/v1/virtual-bank-account", datax, config)
    return data
}
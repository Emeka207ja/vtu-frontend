import axios from "axios"

export interface idetail{
    amount: string;
    customerName: string;
    customerEmail: string;
    paymentReference: string;
    paymentDescription: string;
    currencyCode: string;
    contractCode: string;
    redirectUrl: string;
    paymentMethods: string[];
}




export const getBearToken = async()=> {
    const config = {
        headers: {
           " Authorization": "Basic TUtfUFJPRF9RVDlXRjQwUkdMOktaWEpTNEJOTlQ5MlpMRTAzOFcwWlcxWU5ONURWOTdH"
        }
    }
    const { data } = await axios.post("https://api.monnify.com/api/v1/auth/login",null, config);
    return data;
}

export const initiateTransfer = async (token: string,detail:idetail) => {
    const config = {
        headers: {
           " Authorization":` Bearer ${token}`
        }
    }
    const { data } = await axios.post("https://api.monnify.com/api/v1/merchant/transactions/init-transaction", detail, config);
    return data;
}
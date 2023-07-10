import axios from "axios"




export const getName = async (username: string, accessToken: string) => {
     const config = {
            headers: {
                Authorization :`Bearer ${accessToken?.slice(1,-1)}`
            }
        }
    const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/peer/confirm_user", { username }, config)
    return data;
}

export const peerTransfer = async(amount:number,recieverName:string,accessToken:string)=>{
    console.log(amount,recieverName)
     const config = {
            headers: {
                Authorization :`Bearer ${accessToken?.slice(1,-1)}`
            }
        }
    const {data} = await axios.post("https://easybuyapi.adaptable.app/api/v1/peer",{amount,recieverName},config)
    return data;


}
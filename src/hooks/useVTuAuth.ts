import { useEffect,useState } from "react";
import axios from "axios"

export function useVtuAuth() {
    const [username,setUser] = useState("")
    const [password,setPassword] = useState("")
    const [fail, setFail] = useState<any>({})
    

    interface reponse {password:string,username:string}
    useEffect(() => {
        async function getVtuAuthDetails() {
          
          try {
            const { data } = await axios.get("https://easybuyapi.adaptable.app/api/v1/auth/vtu_auth")
            setUser(data?.username)
            setPassword(data?.password)
          } catch (error) {
              setFail(error)
              console.log(error)
          }
           
        }
        getVtuAuthDetails()
    }, [])
    return {
       username,password,fail
    }
    
}
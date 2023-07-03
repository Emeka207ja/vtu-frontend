import { Box,PinInput, PinInputField,HStack,Card,CardHeader,CardBody,CardFooter,Text,Heading,Button } from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { genReqId } from "../History/util.service"
import { useEffect, useState } from "react"
import { getHeaders } from "./service"
import axios from "axios"

export const ConfirmAirtime = () => {
    const [apikey,setApikey] = useState<string>("")
    const [secretKey,setSecret] = useState<string>("")
    const [network] = useQuerryString("network")
    const [Amount] = useQuerryString("amount")
    const [Phone] = useQuerryString("phone")
   
     const [value, setValue] = useState("")
     const [loading, setLoading] = useState(false)
     const [success, setSuccess] = useState(false)

    const handleChange = (value: string) => {
        setValue(value)
    }

    const handleComplete = async (value: string) => {
        const request_id = genReqId()
        const serviceID = network
        const amount = parseFloat(Amount)
        const phone = parseFloat(Phone)
        const config = {
            headers: {
               " api-key": apikey,
                "secret-key": secretKey
            }
        }
        try {
            setLoading(true)
            setSuccess(false)
            const { data } = await axios.post("https://sandbox.vtpass.com/api/pay", {request_id,serviceID, amount, phone }, config)
            console.log(data)
            setLoading(false)
            setSuccess(true)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setSuccess(false)
        }
       
    }

    const getheaderParams = async () => {
        try {
            const data = await getHeaders()
            
            if (data) {
                const { api_key, secret_key } = data
                setApikey(api_key)
                setSecret(secret_key)
            }
        } catch (error) {
            console.log(error)
        }
    }
  

    useEffect(() => {
        getheaderParams()
    },[])
    
    return (
        <Box>
            <Card>
                <CardHeader>{ loading?"loading":"Confirm Airtime Purchase"}</CardHeader>
                <CardBody>
                    <Text>Network : {network }</Text>
                    <Text>Phone number : {Phone}</Text>
                    <Text>Amount : {Amount}</Text>
                    
                </CardBody>

                <CardFooter>
                    <Box>
                        <Heading fontSize={"1rem"} mb={"0.7rem"}>Input transfer pin</Heading>
                        <HStack>
                            <PinInput value={value} onChange={handleChange} onComplete={handleComplete}>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                       
                   </Box>
                </CardFooter>
            </Card>
        </Box>
    )
}
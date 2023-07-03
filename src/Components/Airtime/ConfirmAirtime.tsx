import {
    Box,
    PinInput,
     PinInputField,
      HStack, Card, 
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    Heading,
    Button,
    Link,
    Spinner,
} from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { genReqId } from "../History/util.service"
import { useEffect, useState } from "react"
import { getHeaders } from "./service"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getProfileAction } from "@/redux/actions/getProfile.action"

export const ConfirmAirtime = () => {
    const [apikey,setApikey] = useState<string>("")
    const [secretKey,setSecret] = useState<string>("")
    const [network] = useQuerryString("network")
    const [Amount] = useQuerryString("amount")
    const [Phone] = useQuerryString("phone")

    const { accessToken } = useAppSelector(state => state.loginAuth)
    const {Profile} = useAppSelector(state=>state.fetchProfile)
    const dispatch = useAppDispatch()
   
     const [value, setValue] = useState("")
     const [loading, setLoading] = useState(false)
     const [success, setSuccess] = useState(false)

    const handleChange = (value: string) => {
        setValue(value)
    }
  
    const defaultPin = 1111

    const handleComplete = async (value: string) => {
        const pin = parseFloat(value)
        if (pin === defaultPin ) {
            toast.error("can not use default pin please rest")
            return 0
        }
        if (pin!== Profile?.pin) {
            toast.error("invalid credentials")
            return 0
        }
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
            toast.success("success")
            setLoading(false)
            setSuccess(true)
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message)||error.message
            console.log(message)
            toast.error(message)
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
        getheaderParams();
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
       }
        
    },[accessToken])
    
    return (
        <Box>
            <Card>
                <CardHeader>
                    <Heading textAlign={"center"} fontSize={"1.2rem"}>
                        { loading?(<Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='xl'
                                        />):"Confirm Airtime Purchase"}
                    </Heading>
                </CardHeader>
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
            <Box mt={"0.6rem"}>
                <Link href="/airtime" fontSize={"0.9rem"}>Go back</Link>
            </Box>

            <ToastContainer limit={ 1} />
        </Box>
    )
}
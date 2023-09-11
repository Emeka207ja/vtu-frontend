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
import { getHeaders,stroreAirtime,iairtimePurchase } from "./service"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { payApi } from "@/api-folder/vtpass"
import { iProfile } from "@/redux/interface/profileInterface"
import { idebit,debitHandler } from "../DataTwo/service"
import { vtpassBaseApi } from "../../api-folder/auth"
export const ConfirmAirtime = () => {
    const [apikey,setApikey] = useState<string>("")
    const [secretKey,setSecret] = useState<string>("")
    const [network] = useQuerryString("network")
    const [Amount] = useQuerryString("amount")
    const [phone] = useQuerryString("phone")
    const [profileUser,setProfile] = useState<iProfile|null>(null)

    const { accessToken,pending } = useAppSelector(state => state.loginAuth)
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
        if (!accessToken) {
            toast.error("auth error")
            return
        }
        if (!Profile) {
            console.log("profile error")
            return
        }
         const amount = Math.ceil(parseFloat(Amount))
        const pin = parseFloat(value)
       
        if (pin!== Profile.pin || Profile.balance<amount) {
            toast.error("invalid credentials or amount")
            return 0
        }
       
        const request_id = genReqId()
        const serviceID = network
        const payload = {
            request_id,
            serviceID,
            amount,
            phone
        }
        // const phone = parseFloat(Phone)
        const config = {
            headers: {
               " api-key": apikey,
                "secret-key": secretKey
            }
        }
        const val:iairtimePurchase ={
            network:serviceID,
            phone:phone,
            Amount:amount,
            order_id  : request_id
        }
        const debitDetail: idebit = {
            amount,
            requestId: request_id,
            service:"vtpassairtime"
        }
        try {
            setLoading(true)
            setSuccess(false)
            const debitResponse = await debitHandler(accessToken, debitDetail)
    
            const { data } = await axios.post(`${vtpassBaseApi}/pay`, payload, config)
            if (data && data.code !== "000") {
                toast.error("transaction failed")
                setLoading(false)
                setSuccess(false)
                console.log(data)
            }
            const res = await stroreAirtime(accessToken, val)
           
            toast.success("success")
            setLoading(false)
            setSuccess(true)
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message)||error.message
            console.log(message)
            toast.error(message)
            setLoading(false)
            setSuccess(false)
            console.log(error)
        }
       
    }

    const getheaderParams = async () => {
        try {
            setLoading(true)
            setSuccess(false)
            const data = await getHeaders()
            
            if (data) {
                const { api_key, secret_key } = data
                setApikey(api_key)
                setSecret(secret_key)
            }
            setLoading(false)
            setSuccess(true)
        } catch (error:any) {
            console.log(error)
            const message = (error.response && error.response.data && error.response.data.message)||error.message
            console.log(message)
            toast.error(message)
            setLoading(false)
            setSuccess(false)
        }
    }
  

    useEffect(() => {
        getheaderParams();
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
       }
        
    }, [accessToken])
    
    // useEffect(() => {
    //    const profilex: string|null = typeof window !== 'undefined' ? localStorage.getItem('profile') : null
    //     if (profilex) {
    //         const user: iProfile = JSON.parse(profilex)
    //         setProfile(user)
    //         console.log("store",user.id)
    //     }
        
    // }, [])
    
    return (
        <Box>
            <Card>
                <CardHeader>
                    <Heading textAlign={"center"} fontSize={"1.2rem"}>
                        {pending || loading?(<Spinner
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
                    <Text>Phone number : {phone}</Text>
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
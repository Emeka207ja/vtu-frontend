import { Card, Heading, Box, PinInput, PinInputField, CardBody, CardHeader,HStack, CardFooter,Text,Spinner } from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect, useState } from "react"
import { getHeaders } from "../Airtime/service"
import { genReqId } from "../History/util.service"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subElectricity } from "./Service"
import { FaBullseye } from "react-icons/fa"
import { subPrepaid,iPrepaid,iReq } from "./Service"
import { idebit,debitHandler } from "../DataTwo/service"


export const PrepaidConfirm: React.FC = () => {
    const [value, setValue] = useState("")
    const [api_key,setApikey] = useState("")
    const [secret_key, setSecretKey] = useState("")
    const [loading,setLoading] = useState<boolean>(false)
    const [success,setSuccess] = useState<boolean>(false)



    const [billersCode] = useQuerryString("meterNumber")
    const [variation_code] = useQuerryString("meterType")
    const [Amount] = useQuerryString("Amount")
    const [Phone] = useQuerryString("Phone")
    const [serviceID] = useQuerryString("serviceId")
    const [name] = useQuerryString("name")

    const dispatch = useAppDispatch()

    const { accessToken } = useAppSelector(state => state.loginAuth)
    const {Profile} = useAppSelector(state=>state.fetchProfile)

     const handleChange = (value: string) => {
        setValue(value)
    }
    const handleComplete = async (value: string) => {
       
        
        const price = parseFloat(Amount)
        const debitPrice = Math.ceil(price)
        const pin = parseFloat(value)
        const request_id = genReqId()
        if (pin === 1111) {
            toast.error("default pin not allowed")
            return
        }
        if (pin !== Profile?.pin) {
            toast.error("invalid credentials")
            return
        }
         if (!accessToken) {
            toast.error("auth error");
            return
        }
        const detail: iReq = {
            api_key,
            secret_key,
            amount:price,
            phone:Phone,
            serviceID,
            variation_code,
            billersCode,
            request_id
        }
        const debitDetail: idebit = {
            requestId: request_id,
            amount: debitPrice,
            service:"vtpassElectricity"
        }
        try {
            setLoading(true)
            setSuccess(false)
            const debitResponse = await debitHandler(accessToken, debitDetail)
            const data = await subElectricity(detail)
        //    console.log(data)
            if (data && data.code !== "000") {
                toast.error("failed transaction")
                setLoading(false)
                setSuccess(false)
                return
             }
            const amt:string = data.amount;
            
            const purchased_code:string = data.purchased_code
            const product_name:string = data.content?.transactions?.product_name
            const requestId:string = data.requestId
            const amount = parseFloat(amt)

            const vals:iPrepaid = {
                amount,purchased_code,product_name,requestId
            }
            console.log(vals)
            const datax = await subPrepaid(accessToken, vals,"prepaid")
            console.log(datax)
            
            setLoading(false)
            setSuccess(true)
            toast.success("transaction successful")
        } catch (error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message
            console.log(message)
            console.log(error)
            toast.error(message)
            setLoading(false)
            setSuccess(false)
        }
    }
    const Header = async () => {
        try{
            const data = await getHeaders()
            if (data) {
                const { api_key, secret_key } = data
                setApikey(api_key)
                setSecretKey(secret_key)
            }
            console.log(data)
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        Header()
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    },[])
    return (
        <Box>
            <Card>
                <CardHeader>
                    <Heading fontSize={"1.2rem"}>
                        {
                            loading?(<Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='xl'
                                        />): "Confirm Payment"
                        }
                    </Heading>
                </CardHeader>
                <CardBody>
                    <Text>Provider : { name}</Text>
                    <Text>Meter Number : { billersCode}</Text>
                    <Text>Meter Type : { variation_code}</Text>
                    <Text>Amount : { Amount}</Text>
                    <Text>Phone Number : { Phone}</Text>
                </CardBody>
                <CardFooter>
                     <HStack>
                            <PinInput value={value} onChange={handleChange} onComplete={handleComplete}>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                </CardFooter>
            </Card>
            <ToastContainer limit={1}/>
        </Box>
    )
}
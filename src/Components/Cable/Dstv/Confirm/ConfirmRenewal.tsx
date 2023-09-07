import { Box, Heading,Card,CardHeader,CardBody,CardFooter,PinInput,PinInputField,Text,Spinner,Button } from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useState, useEffect } from "react"

import { getHeaders } from "@/Components/Airtime/service"
import { renewSub,storeDstv,idstvStore} from "./service"
import { genReqId } from "@/Components/History/util.service"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextRouter,useRouter } from "next/router"
import { verifySmartCard } from "../service"
import { iOldDstvSub } from "../icardHolder"
import { idebit,debitHandler } from "@/Components/DataTwo/service"


export const ConfirmRenewal: React.FC = () => {

    const router: NextRouter = useRouter()
    
   
    const [billersCode] = useQuerryString("biller")
    const [Phone] = useQuerryString("phone")
    const [Amount] = useQuerryString("amt")
    const [serviceID] = useQuerryString("sId")
    const [subscription_type] = useQuerryString("subType")

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile } = useAppSelector(state => state.fetchProfile)
    
    const dispatch = useAppDispatch()

    const [auth, setAuth] = useState<{ api_key: string, secret_key: string }>({ api_key: "", secret_key: "" })

    const [value, setValue] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [holder, setHolder] = useState<iOldDstvSub | null>(null)
    const [price,setPrice] = useState<number|null>(null)

    const handleChange = (value: string) => {
        setValue(value)
    }


    const handleComplete = async(value: string):Promise<void> => {
        if (!accessToken) {
           toast.error("auth error")
            return
        }
        const pin: number = parseFloat(value);
        if (Profile.pin !== pin) {
            toast.error("invalid credentials")
            return
        }
        if ( Profile.balance! < parseFloat(Amount)) {
            toast.error("insufficient funds")
            return
        }
        if (!price) {
            console.log("null price")
            return
        }
       
        const amount:number = parseFloat(Amount);
        const request_id:string = genReqId()
        const content = {
            request_id,
            serviceID,
            billersCode,
            amount,
            phone: Phone,
            subscription_type
        }
        const debitDetails: idebit = {
            amount: price,
            requestId: request_id,
            service: "vtpassDstvOld"
        }
        try {
            setLoading(true)
            const debitResponse = await debitHandler(accessToken, debitDetails)
            const data: any = await renewSub(auth, content)
             if (data && data.code !== "000") {
                toast.error("transaction failed")
                setLoading(false)
                return
            }
            const detail: idstvStore = {
                phone:Phone,
                amount,
                requestId:request_id
            }
            const res = await storeDstv(accessToken,detail,"dstv")
            toast.success("success")
            setLoading(false)
        } catch (error: any) {
            const message:string = (error.response && error.response.data && error.response.data.message)||error.message
            setLoading(false)
            console.log(message)
        }
    }
    

    const Headers = async ():Promise<void> => {
        try {
            const data: { api_key: string, secret_key: string } = await getHeaders()
            if (data) {
                setAuth(data)
            }
        } catch (error:any) {
            console.log(error)
        }
    }

     const confirmCard = async () => {
        
         const card = billersCode.trim()
        try {
            setHolder(null)
            const datax = await verifySmartCard(card, auth, "dstv");
            if (datax) {
                const val: iOldDstvSub = datax.content[1]?.json?.details?.items[1]
                const Price = Math.ceil(val.price)
                setPrice(Price)
            }
            
        } catch (error:any) {
            const message:string = (error.response && error.response.data && error.response.data.message)||error.message
            console.log(message)
        }
    }

    useEffect(() => {
        Headers()
          if (accessToken) {
           dispatch(getProfileAction(accessToken))
        }
    }, [accessToken])
    
    useEffect(() => {
        if (auth) {
           confirmCard()
      }
    }, [auth])
 
    return (
        <Box>
            <Card>
                <CardHeader>
                    {
                        loading?(<Spinner/>): <Heading fontSize={"1rem"}>confirm subscription renewal</Heading>
                   }
                </CardHeader>
                <CardBody>
                    <Text fontSize={"0.8rem"}>Phone number : {Phone }</Text>
                    <Text fontSize={"0.8rem"}>subscription type : package renewal</Text>
                    <Text fontSize={"0.8rem"}>Amount : {parseFloat(Amount)}</Text>
                </CardBody>
               
                <CardFooter>
                    <Box>
                        <Box mb={"0.8rem"}>
                            <Text>input your password</Text>
                        </Box>
                        <PinInput onChange={handleChange} onComplete={handleComplete}>
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                        </PinInput>

                        <Box mt={"0.8rem"}>
                            <Button onClick={()=>router.push("/cable")} colorScheme="blue">back</Button>
                        </Box>
                </Box>
                </CardFooter>
            </Card>
            <ToastContainer limit={1}/>
        </Box>
    )
}
import {
    Box, Heading, Card,
    CardHeader, CardBody,
    CardFooter, PinInput,
    PinInputField, Text,
    Spinner, Button, Center
} from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useState, useEffect } from "react"
import { NewSub } from "../NewSub"
import { getHeaders } from "@/Components/Airtime/service"
import { newSub,storeDstv,idstvStore } from "./service"
import { genReqId } from "@/Components/History/util.service"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextRouter,useRouter } from "next/router"
import { iVar } from "@/Components/Data/iProfvider"
import { getDataVars } from "@/Components/Data/service"
import { idebit,debitHandler } from "@/Components/DataTwo/service"


export const ConfirmNewSub: React.FC = () => {

    const router: NextRouter = useRouter()
    
    const [variation_code] = useQuerryString("varcode")
    const [billersCode] = useQuerryString("biller")
    const [Phone] = useQuerryString("phone")
    const [Amount] = useQuerryString("amt")
    const [serviceID] = useQuerryString("sId")
    const [subscription_type] = useQuerryString("subType")
    const [type] = useQuerryString("type")

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile } = useAppSelector(state => state.fetchProfile)
    
    const dispatch = useAppDispatch()

    const [auth, setAuth] = useState<{ api_key: string, secret_key: string }>({ api_key: "", secret_key: "" })

    const [value, setValue] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [vars, setVars] = useState<iVar[] | []>([])
    const [price,setPrice] = useState<number|null>(null)

    const handleChange = (value: string) => {
        setValue(value)
    }


    const handleComplete = async (value: string): Promise<void> => {
         const amount:number = parseFloat(Amount);
        if (!accessToken) {
           toast.error("auth error,ensure you have good connection and refresh")
            return
        }
        const pin: number = parseFloat(value);
        if (Profile.pin !== pin) {
            toast.error("invalid credentials")
            return
        }
        if (Profile && Profile.balance < amount) {
            toast.error("insufficient funds")
            return
        }
        if (!price) {
            console.log("null price")
            return
        }

       
        const request_id:string = genReqId()
        const content = {
            request_id,
            serviceID,
            billersCode,
            variation_code,
            amount,
            phone:Phone,
            subscription_type
        }
        const debitDetails: idebit = {
            requestId: request_id,
            amount: price,
            service: "vtpassDstvNew"
        }
        try {
            setLoading(true)
            console.log("loading")
            const debitResponse = await debitHandler(accessToken, debitDetails)
            console.log(debitResponse)
            const data: any = await newSub(auth, content)
            if (data && data.code !== "000") {
                toast.error("transaction failed")
                return
            }
            const detail: idstvStore = {
                phone:Phone,
                amount,
                requestId:request_id
            }
            if (type && type === "gotv") {
                const res = await storeDstv(accessToken,detail,"gotv")
                toast.success("success")
                setLoading(false)
                return
            }
            const res = await storeDstv(accessToken, detail, "dstv")
            toast.success("success")
         
            setLoading(false)
        } catch (error: any) {
            const message:string = (error.response && error.response.data && error.response.data.message)||error.message
            setLoading(false)
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

     const handleDstvVars = async () => {
        try {
            const data = await getDataVars("dstv")
            if(data){
                const varation = data.content?.varations
                setVars(varation)
            }
           
        }catch(error:any){
            const message:string = (error.response && error.response.data && error.response.data.message)||error.message
            console.log(message)
        }
    }

    useEffect(() => {
        Headers()
        handleDstvVars()
         if (accessToken) {
           dispatch(getProfileAction(accessToken))
        }
    }, [accessToken])
 
     useEffect(() => {
        if (vars.length > 0) {
            const selectedArr = vars.filter(item => item.variation_code === variation_code)
            const stringAmt: string = selectedArr[0]?.variation_amount
            const amtx = parseFloat(stringAmt)
            const amt = Math.ceil(amtx)
            setPrice(amt)
        }
    },[vars])
    
    return (
        <Box>
            <Card>
                <CardHeader>
                    {
                        loading? (
                            <Center>
                                <Spinner/>
                            </Center>
                        ): <Heading fontSize={"1rem"}>confirm subscription</Heading>
                    }
                </CardHeader>
                <CardBody>
                    <Text fontSize={"0.8rem"}>Phone number : {Phone }</Text>
                    <Text fontSize={"0.8rem"}>subscription type : {variation_code }</Text>
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
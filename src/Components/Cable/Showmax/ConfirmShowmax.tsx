import { Box, Heading,Card,CardHeader,CardBody,CardFooter,PinInput,PinInputField,Text,Spinner,Button } from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useState, useEffect } from "react"
import { idebit,debitHandler } from "@/Components/DataTwo/service"
import { getHeaders } from "@/Components/Airtime/service"
import { newSub,storeShowmax,istoreShowmax } from "./service"

import { genReqId } from "@/Components/History/util.service"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextRouter,useRouter } from "next/router"
import { getDataVars } from "@/Components/Data/service"
import { iVar } from "@/Components/Data/iProfvider"


export const ConfirmShowmax: React.FC = () => {

    const router: NextRouter = useRouter()
    
    const [variation_code] = useQuerryString("varcode")
    const [Phone] = useQuerryString("phone")
    const [Amount] = useQuerryString("amt")
    const [serviceID] = useQuerryString("sId")

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
        const content = { request_id, serviceID, variation_code, amount, phone:Phone}
        const debitDetail: idebit = {
            requestId: request_id,
            amount: price,
            service:"vtpassShowmax"
        }
        try {
            setLoading(true)
            const debitResponse = await debitHandler(accessToken, debitDetail)
            const data: any = await newSub(auth, content)
            if (data && data.code !== "000") {
                toast.error("failed transaction")
                return
            }
            const product_name: string = data.content?.transactions?.product_name 
            const purchased_code:string = data.purchased_code || "not available"
            const detail: istoreShowmax = {
                amount,
                phone:Phone,
                requestId: request_id,
                product_name,
                purchased_code
            }
            const res = await storeShowmax(accessToken,detail)
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
            const data = await getDataVars("showmax")
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
    }, [])
    
    useEffect(() => {
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
                        loading? (<Spinner/>): <Heading fontSize={"1rem"}>confirm subscription</Heading>
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
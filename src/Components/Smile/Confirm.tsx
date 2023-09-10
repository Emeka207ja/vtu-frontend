import { Box, Card, CardBody, CardFooter, CardHeader, Heading,Text,PinInput,PinInputField,HStack,Spinner } from "@chakra-ui/react";
import { SmileLogo } from "./Logo";
import useQuerryString from "@/hooks/useQueryString";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { genReqId } from "../History/util.service";
import { getProfileAction } from "@/redux/actions/getProfile.action";
import { ToastContainer, toast } from 'react-toastify';
import { getHeaders } from "../Airtime/service";
import 'react-toastify/dist/ReactToastify.css';
import { purchaseSmile,storeSmile,ismile, getVariationCode } from "./service";
import { iVar } from "./variation.interface";
import { idebit,debitHandler } from "../DataTwo/service";
export const ConfirmSmile: React.FC = () => {

    const [value, setValue] = useState("")
    const [api_key,setApikey] = useState<string>("")
    const [secret_key, setSecret] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [vars, setVars] = useState<iVar[] | []>([])
    const [price,setPrice] = useState<number|null>(null)
    const { accessToken } = useAppSelector(state => state.loginAuth)
    const { Profile } = useAppSelector(state => state.fetchProfile)
    const dispatch = useAppDispatch()
    
    const [phone]= useQuerryString("phone")
    const [variation_code]= useQuerryString("varcode")
    const [billersCode]= useQuerryString("bill")
    const [serviceID]= useQuerryString("servID")
    const [Amount]= useQuerryString("amount")
    // const [phone]= useQuerryString("phone")


    const handleChange = (value: string) => {
        setValue(value)
    }

    const amount = parseFloat(Amount)

    const handleComplete = async (value: string) => {
        if (!accessToken) {
            toast.error("error! refresh page");
            return;
        }
        const pin = parseFloat(value)
        if (pin !== Profile?.pin) {
            toast.error("invalid credentials")
            return
        }
        if (Profile && Profile.balance< amount) {
            toast.error("insufficient balance")
            return
        }
        if (!price) {
            console.log("null price")
            return
        }
        const request_id = genReqId()
      
        const debitDetail: idebit = {
            requestId: request_id,
            amount: price,
            service:"vtpassSmile"
        }
        try {
            setLoading(true)
            setSuccess(false)
            const debitResponse = await debitHandler(accessToken, debitDetail)
            const data = await purchaseSmile(request_id, serviceID, billersCode, variation_code, amount, phone, api_key, secret_key)
            if (data && data.code !== "000") {
                setLoading(false)
                setSuccess(false)
                toast.error("error occured")
                return
            }
            const detail: ismile = {
                amount,
                phone,
                requestId:request_id
            }
            const res = await storeSmile(accessToken,detail)
            setLoading(false)
            setSuccess(true)
            toast.success("success")
        } catch (error:any) {
            console.log(error)
            const message = (error.response &&error.response.data && error.response.data.message)||error.message
            setLoading(false)
            setSuccess(false)
            toast.error(message)
        }
    }
    

    const headers = async () => {
        try {
            const data = await getHeaders()
            if (data) {
                setApikey(data.api_key);
                setSecret(data.secret_key)
            }
           
        } catch (error:any) {
            console.log(error)
        }
    }

     const variationCode = async () => {
        try {
            const data = await getVariationCode()
            if (data) {
                const varation = data.content?.varations
            setVars(varation)
            }
        } catch (error:any) {
            console.log(error)
        }
    }
   

    useEffect(() => {
        headers()
        variationCode()
        if(accessToken) {
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
            <SmileLogo/>
            <Card>
                <CardHeader>
                    <Heading fontSize={"1.2rem"}>
                        {loading?(<Spinner/>):"Confrim transaction"}
                    </Heading>
                </CardHeader>
                <CardBody>
                    <Text>Account ID : {billersCode }</Text>
                    <Text>Phone Number : {phone }</Text>
                    <Text>Amount : {amount }</Text>
                </CardBody>
                <CardFooter>
                    <HStack>
                        <PinInput value={value} onChange={handleChange} onComplete={handleComplete}>
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                            <PinInputField/>
                        </PinInput>
                    </HStack>
                </CardFooter>
            </Card>
            <ToastContainer limit={1}/>
        </Box>
    )
}
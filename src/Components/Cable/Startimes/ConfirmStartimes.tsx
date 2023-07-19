import { Box, Heading,Card,CardHeader,CardBody,CardFooter,PinInput,PinInputField,Text,Spinner,Button } from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useState, useEffect } from "react"

import { getHeaders } from "@/Components/Airtime/service"
import { newSub } from "./service"
import { genReqId } from "@/Components/History/util.service"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextRouter,useRouter } from "next/router"


export const ConfirmStartimes: React.FC = () => {

    const router: NextRouter = useRouter()
    
    const [variation_code] = useQuerryString("varcode")
    const [billersCode] = useQuerryString("biller")
    const [Phone] = useQuerryString("phone")
    const [Amount] = useQuerryString("amt")
    const [serviceID] = useQuerryString("sId")
    

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile } = useAppSelector(state => state.fetchProfile)
    
    const dispatch = useAppDispatch()

    const [auth, setAuth] = useState<{ api_key: string, secret_key: string }>({ api_key: "", secret_key: "" })

    const [value, setValue] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)

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
        const phone:number = parseFloat(Phone);
        const amount:number = parseFloat(Amount);
        const request_id:string = genReqId()
        const content = { request_id, serviceID, billersCode, variation_code, amount, phone,}
        console.log(content)
        try {
            setLoading(true)
            const data: any = await newSub(auth, content)
            if (data) {
                toast.success("success")
                console.log(data)
            }
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
                console.log(data)
            }
        } catch (error:any) {
            console.log(error)
        }
    }

    useEffect(() => {
        Headers()
    }, [])
    
    useEffect(() => {
        if (accessToken) {
           dispatch(getProfileAction(accessToken))
        }
    }, [accessToken])
 
    
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
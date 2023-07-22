import { Box, Card, CardBody, CardFooter, CardHeader, PinInput, PinInputField, HStack,Text,Heading,Button,Spinner } from "@chakra-ui/react"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useState, useEffect } from "react"
import useQuerryString from "@/hooks/useQueryString"
import { useRouter, NextRouter } from "next/router"
import { peerTransfer } from "./service"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Confirm: React.FC = () => {

    const router: NextRouter = useRouter()
    
    const [name] = useQuerryString("name")
    const [Amount] = useQuerryString("amt")
    const [recieverName] = useQuerryString("username")

    const [value,setValue] = useState<string>("")

    const [sending,setSending] = useState<boolean>(false)
    const [success,setSuccess] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const {Profile} = useAppSelector(state=>state.fetchProfile)

    const handleChange = (value: string) => {
        setValue(value)
    }
   
    const handleComplete  = async(value:string)=>{
       
        if(!accessToken){
            toast.error("auth error");
            return;
        }
        const pin = parseFloat(value)
        if(pin!== Profile?.pin){
            toast.error("invalid credentials")
            return;
        }
       
       const amount = parseFloat(Amount)
        try {
            setSending(true)
            const datax = await  peerTransfer(amount,recieverName,accessToken)
            setSending(false)
            toast.success("transfer successfull")
        } catch (error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message;
           
            toast.error(message)
             setSending(false)
            console.log(error)
        }
    }

    useEffect(() => {
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    },[accessToken])

    return (
        <Box>
            <Card>
                <CardHeader>
                    <Heading fontSize={"1.2rem"}>
                        {
                            sending? (<Spinner/>):"Confirm transfer"
                        }
                    </Heading>
                </CardHeader>

                <CardBody>
                    <Text>Name: {name }</Text>
                    <Text>Amount: {Amount }</Text>
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
            <Box mt={"0.8rem"}>
                <Button colorScheme="red" onClick={()=>router.push("/peer")}>cancel</Button>
            </Box>
            <ToastContainer limit={1}/>
        </Box>
    )
}
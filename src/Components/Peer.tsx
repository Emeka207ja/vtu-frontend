import { useAppDispatch,useAppSelector } from "@/redux/hooks"
import axios from "axios"
import { Box,Heading,FormControl,FormLabel,Button,Input,FormHelperText,Spinner } from "@chakra-ui/react"
import { useState,useEffect } from "react"
import { Spin } from "./Spinner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {peerTransfer} from "@/Services/Data-fetching-service"


export const Peer = ()=>{
    const [data,setData] = useState<{username:string,Amount:string}>({username:"",Amount:""})
    const [debounce,setDeBounce] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const [sending,setSending] = useState<boolean>(false)
    const [confirmed,setConfirmed] = useState<null|string>(null)

    const {accessToken} = useAppSelector(state=>state.loginAuth)

    const handleInputChange = (e:React.SyntheticEvent)=>{
        const target = e.target as HTMLInputElement;
        setData(prev=>({
            ...prev,[target.name]:target.value
        }))
    }

    const handleSubmit  = async(e:React.SyntheticEvent)=>{
        e.preventDefault()
        if(!accessToken){
            toast.error("auth error");
            return;
        }
       const {Amount,username:recieverName} = data
       const amount = parseFloat(Amount)
        try {
            setSending(true)
            const datax = await peerTransfer(amount,recieverName,accessToken)
            setSending(false)
            toast.success("transfer successfull")
        } catch (error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message;
           
            toast.error(message)
             setSending(false)
            console.log(error)
        }
    }

    const confirmName = async()=>{
        const {username} = data
        console.log(username)
        const config = {
            headers: {
                Authorization :`Bearer ${accessToken?.slice(1,-1)}`
            }
        }
        try {
            setLoading(true)
            setConfirmed(null)
            const {data} = await axios.post("https://easybuyapi.adaptable.app/api/v1/peer/confirm_user",{username},config)
            if(data){
                setConfirmed(data.email)
            }
            setLoading(false)
            // toast.success("user confirmed")
            console.log(data)
        } catch (error:any) {
           
            const message = (error.response && error.response.data && error.response.data.message) || error.message;
            toast.error(message)
             setLoading(false)
            console.log(message)
        }
    }

    useEffect(()=>{

        const timer = setTimeout(()=>{
            setDeBounce(data.username)
        },500)

        return ()=>{
            clearTimeout(timer)
        }
    },[data.username])

    useEffect(()=>{
        if(debounce !== ""){
            confirmName()
        }
    },[debounce])
    return(
        <Box>
            <Heading textAlign={"center"} fontSize={"1rem"} mb={"1rem"}>
                {
                    loading?(<Spin/>):sending?(<Spinner color='red.500' />):"Peer to Peer transfer"
                }
            </Heading>

            <form onSubmit={handleSubmit}>
                
                <FormControl mb={"1rem"}>
                    <FormLabel fontSize={"0.8rem"}> Receiver's username</FormLabel>
                    <Input value={data.username} name="username" onChange={handleInputChange} isRequired/>
                    {
                        confirmed&&<FormHelperText>{confirmed}</FormHelperText>
                    }
                </FormControl>

                <FormControl mb={"0.8rem"}>
                    <FormLabel fontSize={"0.8rem"}>Amount</FormLabel>
                    <Input value={data.Amount} name="Amount" onChange={handleInputChange} isRequired/>
                </FormControl>

                <Button type={"submit"} w={"100%"} colorScheme="blue">Transfer</Button>
            </form>
            <ToastContainer limit={1}/>
        </Box>
    )
}
import { useAppDispatch,useAppSelector } from "@/redux/hooks"
import axios from "axios"
import {
    Box, Heading, FormControl,
    FormLabel, Button,
    Input, FormHelperText,
    Spinner, HStack, Container,
    Image,Center
} from "@chakra-ui/react"
import { useState,useEffect } from "react"
import { Spin } from "../Spinner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {peerTransfer} from "@/Services/Data-fetching-service"
import { useRouter, NextRouter } from "next/router"
import { getName } from "./service"

export const Peer = () => {
    const router:NextRouter = useRouter()
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

    // const handleSubmit  = async(e:React.SyntheticEvent)=>{
    //     e.preventDefault()
    //     if(!accessToken){
    //         toast.error("auth error");
    //         return;
    //     }
    //    const {Amount,username:recieverName} = data
    //    const amount = parseFloat(Amount)
    //     try {
    //         setSending(true)
    //         const datax = await peerTransfer(amount,recieverName,accessToken)
    //         setSending(false)
    //         toast.success("transfer successfull")
    //     } catch (error:any) {
    //         const message = (error.response && error.response.data && error.response.data.message) || error.message;
           
    //         toast.error(message)
    //          setSending(false)
    //         console.log(error)
    //     }
    // }
    
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const {Amount,username} = data
        router.push(`/peer/confirm?name=${confirmed}&amt=${Amount}&username=${username}`)
    }

    const confirmName = async()=>{
        const {username} = data
        if (!accessToken) {
            toast.error("Auth error");
            return;
       }
       
        try {
            setLoading(true)
            setConfirmed(null)
           const data = await getName(username.trim().toLowerCase(),accessToken)
            if(data){
                setConfirmed(data.name)
            }
            setLoading(false)
            // toast.success("user confirmed")
           
        } catch (error:any) {
           
            const message = (error.response && error.response.data && error.response.data.message) || error.message;
            toast.error(message)
             setLoading(false)
            
        }
    }

    useEffect(()=>{

        const timer = setTimeout(()=>{
            setDeBounce(data.username)
        },1000)

        return ()=>{
            clearTimeout(timer)
        }
    },[data.username])

    useEffect(()=>{
        if(debounce !== "" && debounce.length>=3){
            confirmName()
        }
    },[debounce])
    return(
        <Container mt={"3rem"}>
            <Center mt={"5rem"} mb={"2rem"}>
                <Image src="/assets/images/new_logo.jpg" boxSize='50px' borderRadius='full' objectFit='cover'/>
            </Center>
            <Heading textAlign={"center"} fontSize={"1rem"} mb={"1rem"}>
                {
                    loading?(<Spin/>):sending?(<Spinner color='red.500' />):"In-app Peer  transfer"
                }
            </Heading>

            <form onSubmit={handleSubmit}>
                
                <FormControl mb={"1rem"}>
                    <FormLabel fontSize={"0.8rem"}> Receiver username</FormLabel>
                    <Input value={data.username} name="username" onChange={handleInputChange} isRequired/>
                    {
                        confirmed&&<FormHelperText>{confirmed}</FormHelperText>
                    }
                </FormControl>

                <FormControl mb={"0.8rem"}>
                    <FormLabel fontSize={"0.8rem"}>Amount</FormLabel>
                    <Input value={data.Amount} name="Amount" onChange={handleInputChange} isRequired/>
                </FormControl>

                <HStack>
                    <Button   colorScheme="red" onClick={()=>router.push("/dashboard")}>cancel</Button>
                    <Button type={"submit"} colorScheme="blue" isDisabled={loading ||!confirmed}>proceed</Button>
                </HStack>
            </form>
            <ToastContainer limit={1}/>
        </Container>
    )
}
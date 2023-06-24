import { useAppDispatch,useAppSelector } from "@/redux/hooks"
import axios from "axios"
import { Box,Heading,FormControl,FormLabel,Button,Input,FormHelperText } from "@chakra-ui/react"
import { useState,useEffect } from "react"
import { Spin } from "./Spinner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Peer = ()=>{
    const [data,setData] = useState<{username:string,Amount:string}>({username:"",Amount:""})
    const [debounce,setDeBounce] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const [confirmed,setConfirmed] = useState<null|string>(null)

    const {accessToken} = useAppSelector(state=>state.loginAuth)

    const handleInputChange = (e:React.SyntheticEvent)=>{
        const target = e.target as HTMLInputElement;
        setData(prev=>({
            ...prev,[target.name]:target.value
        }))
    }

    const handleSubmit  = (e:React.SyntheticEvent)=>{
        e.preventDefault()
        console.log(data)
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
            toast.success("user confirmed")
            console.log(data)
        } catch (error:any) {
            setLoading(false)
            const message = (error.response && error.response.data && error.response.data.message) || error.message;
            toast.error(message)
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
            <Heading textAlign={"center"} fontSize={"1rem"}>Peer to Peer transfer</Heading>

            <form onSubmit={handleSubmit}>
                {
                    loading&&(<Spin/>)
                }
                <FormControl mb={"0.6rem"}>
                    <FormLabel>Username of user to receice the funds</FormLabel>
                    <Input value={data.username} name="username" onChange={handleInputChange}/>
                    {
                        confirmed&&<FormHelperText>{confirmed}</FormHelperText>
                    }
                </FormControl>

                <FormControl mb={"0.6rem"}>
                    <FormLabel>Amount</FormLabel>
                    <Input value={data.Amount} name="Amount" onChange={handleInputChange}/>
                </FormControl>

                <Button type={"submit"} w={"100%"} colorScheme="blue">Transfer</Button>
            </form>
            <ToastContainer limit={1}/>
        </Box>
    )
}
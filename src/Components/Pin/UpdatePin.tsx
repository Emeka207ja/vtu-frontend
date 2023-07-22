import {
    Box, Input,
    FormControl, FormLabel,
    Heading, Button,
    PinInput,
    PinInputField,
    Spinner
} from "@chakra-ui/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState,useEffect } from "react"
import { updatePin } from "@/Services/Data-fetching-service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { ChangePin } from "./ChangePin";

export const UpdatePin = () => {
    const [Pin, setPin] = useState<string>("1111")
    const [Pin2, setPin2] = useState<string>("1111")
    const [loading,setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    
    const { accessToken } = useAppSelector(state => state.loginAuth)
    // const dispatch = useAppDispatch()

    const handleChange = (value: string) => {
        setPin(value)
    }
        
    const handleChange2 = (value: string) => {
        setPin2(value)
    }
    
    const handleSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        const pin = parseFloat(Pin)
        const confirm_pin = parseFloat(Pin2)
        if (confirm_pin !== pin) {
            toast.error("pins must match")
            return 0
        }
        if (!accessToken) {
            toast.error("validation error")
            return 0
        }
       try {
           setLoading(true)
           setSuccess(false)
           const data = await updatePin(accessToken, pin, confirm_pin)
           toast.success("pin updated!")
           setSuccess(true)
           setLoading(false)
       } catch (error:any) {
           const message = (error.response && error.response.data && error.response.data.message) || error.message
           console.log(message)
           console.log(error)
           toast.error(message)
            setLoading(false)
           setSuccess(false);
       }
    }

    // useEffect(()=>{},[])
    return (
        <Box>
            <Heading textAlign={"center"} fontSize={"1.2rem"}>
                {
                    loading?(<Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='xl'
                                        />):"Update transaction Pin"
                }
            </Heading>
            <Box position={{base:"absolute",md:"relative"}} left={{base:" 6rem",md:"12rem"}} mt={"1rem"}>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={"1.5rem"}>
                        <FormLabel fontSize={"0.8rem"}>Input pin</FormLabel>
                        <PinInput  value={Pin} onChange={handleChange}>
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </FormControl>

                    <FormControl  mb={"1rem"}>
                        <FormLabel fontSize={"0.8rem"}>Confirm Pin</FormLabel>
                        <PinInput value={Pin2} onChange={handleChange2}>
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </FormControl>

                    <Button type="submit" colorScheme="blue" w={{base:"100%",md:"10rem"}}>Update</Button>
                </form>
                <ToastContainer limit={1}/>
           </Box>
        </Box>
    )
}
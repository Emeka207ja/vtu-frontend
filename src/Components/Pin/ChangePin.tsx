import {
    Box, Input,
    FormControl, FormLabel,
    Heading, Button,
    PinInput,
    PinInputField,
    Spinner,
    Card,
    CardBody,
    CardFooter,
    CardHeader
} from "@chakra-ui/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState,useEffect } from "react"
import { changePin } from "@/Services/Data-fetching-service";
import { useAppDispatch,useAppSelector } from "@/redux/hooks";


export const ChangePin = () => {
    const [Pin, setPin] = useState<string>("")
    const [Pin2, setPin2] = useState<string>("")
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
        const oldPin = parseFloat(Pin)
        const newPin = parseFloat(Pin2)
        
        if (!accessToken) {
            toast.error("validation error")
            return 0
        }
       try {
           setLoading(true)
           setSuccess(false)
           const data = await changePin(accessToken, oldPin, newPin)
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
            
            <Card>
                <CardHeader>
                    <Heading textAlign={"center"} fontSize={"1.2rem"}>
                        {
                            loading?(<Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='blue.500'
                                        size='xl'
                                    />):"Change transaction Pin"
                        }
                    </Heading>
                </CardHeader>
                <CardBody>
                     <Box mt={{base:"1rem",md:"3rem"}}>
                        <form onSubmit={handleSubmit}>
                            <FormControl mb={"1.5rem"}>
                                <FormLabel fontSize={"0.8rem"}>Old Pin</FormLabel>
                                <PinInput  value={Pin} onChange={handleChange}>
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </FormControl>

                            <FormControl  mb={"1rem"}>
                                <FormLabel fontSize={"0.8rem"}>New Pin</FormLabel>
                                <PinInput value={Pin2} onChange={handleChange2}>
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </FormControl>

                            <Button type="submit" colorScheme="blue" w={{base:"10rem",md:"10rem"}}>Update</Button>
                        </form>
                        <ToastContainer limit={1}/>
                    </Box>
                </CardBody>
           </Card>
        </Box>
    )
}
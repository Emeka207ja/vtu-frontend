import { FormControl, Input, Select, FormLabel, Button, Heading,Box,HStack } from "@chakra-ui/react";
import useQuerryString from "@/hooks/useQueryString";
import { useState, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface iForm{
    meter_number: string;
    meter_type: string;
    Amount: string;
    Phone:string
}
export const Form: React.FC = () => {

    const [data,setData] = useState<iForm>({meter_number:"",meter_type:"prepaid",Amount:"",Phone:""})

    const [name] = useQuerryString("key")
    const [serviceId] = useQuerryString("serviceId")
    const router: NextRouter = useRouter()
    const navigate = () => {
        router.push("/electricity")
    }

    const handleInputs = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setData(prev => ({
            ...prev, [target.name]:target.value
        }))
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (parseFloat(data.Amount) < 1000) {
            toast.error("minimium of 1000 naira acceptable");
            return
        }
        const {meter_number,meter_type,Amount,Phone} = data
        router.push(`confirm?meterNumber=${meter_number}&meterType=${meter_type}&Amount=${Amount}&Phone=${Phone}&serviceId=${serviceId}&name=${name}`);
    }

    return (
        <Box>
            <Heading textAlign={"center"} fontSize={"1.2rem"}>{ name?name:"Provider"}</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={"1.6rem"}>
                    <FormLabel>Meter number</FormLabel>
                    <Input value={data.meter_number} onChange={handleInputs} name="meter_number"/>
                </FormControl>

                <FormControl mb={"1.6rem"}>
                    <FormLabel>Meter type</FormLabel>
                     <Select value={data.meter_type} onChange={handleInputs} name="meter_type">
                        <option value="prepaid">prepaid</option>
                        <option value="postpaid">postpaid</option>
                    </Select>
                </FormControl>
                
                <FormControl mb={"1.6rem"}>
                    <FormLabel>Amount</FormLabel>
                    <Input value={data.Amount} onChange={handleInputs} name="Amount" />
                </FormControl>

                <FormControl mb={"1.6rem"}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input value={data.Phone} onChange={handleInputs} name="Phone"/>
                </FormControl>
                <Box>
                    <HStack spacing={50}>
                        <Box onClick={navigate} >
                            <Button colorScheme="red" onClick={navigate}>cancel</Button>
                        </Box>

                        <Box>
                            <Button colorScheme="blue" type="submit" >proceed</Button>
                        </Box>
                    </HStack>
                </Box>
            </form>
            <ToastContainer limit={1}/>
        </Box>
    )
}
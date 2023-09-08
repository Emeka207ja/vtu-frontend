import {
    FormControl, Input,
    Select, FormLabel,
    Button, Heading,
    Box, HStack, Grid,
    Center,Spinner,Text
} from "@chakra-ui/react";
import useQuerryString from "@/hooks/useQueryString";
import { useState, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataVars } from "../Data/service";
import { verifySmartCard,verifyMeter } from "../Cable/Dstv/service";
import { getHeaders } from "../Airtime/service";
import { iHolder } from "../Cable/Dstv/icardHolder";
import { imeterUser } from "./distributor.interface";

interface iForm{
    meter_type:string
    Amount: string;
    Phone:string
}
export const Form: React.FC = () => {

    const [data,setData] = useState<iForm>({meter_type:"prepaid",Amount:"",Phone:""})
    const [meterNumber, setMeterNumber] = useState<string>("")
    const [meterState,setMeterState] = useState<{loading:boolean,error:string}>({loading:false,error:""})
    const [name] = useQuerryString("key")
    const [serviceId] = useQuerryString("serviceId")
    const [authData, setAuthData] = useState<{ api_key: string, secret_key: string }>({ api_key: "", secret_key: "" })
    const [meterUser,setMeterUser] = useState<imeterUser|null>(null)
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
    const handleMeter = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setMeterNumber(target.value)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (parseFloat(data.Amount) < 1000) {
            toast.error("minimium of 1000 naira acceptable");
            return
        }
        const {meter_type, Amount, Phone } = data
        if (meter_type === "prepaid") {
            router.push(`prepaidconfirm?meterNumber=${meterNumber}&meterType=${meter_type}&Amount=${Amount}&Phone=${Phone}&serviceId=${serviceId}&name=${name}`);
        } else {
             router.push(`confirm?meterNumber=${meterNumber}&meterType=${meter_type}&Amount=${Amount}&Phone=${Phone}&serviceId=${serviceId}&name=${name}`);
        }
       
    }

     const authHeaders = async () => {
        try {
            const data = await getHeaders()
            if(data){
                setAuthData(data)
            }
        } catch (error:any) {
            const message:string = (error.response && error.response.data && error.response.data.message)||error.message
            console.log(message)
        }
    }

      const confirmMeter = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const Card = meterNumber.trim()
        try {
           setMeterState({loading:true,error:""})
            const datax = await verifyMeter(Card, authData, serviceId, data.meter_type);
           if (datax && !datax.content?.error){
               const val: imeterUser = datax.content
               setMeterUser(val)
                setMeterState({loading:false, error:""})
            } else if(datax && datax.content?.error) {
               setMeterUser(null)
               const message: string = datax.content?.error
                setMeterState({loading:false, error:message})
            }
        } catch (error:any) {
            const message:string = (error.response && error.response.data && error.response.data.message)||error.message
            console.log(message)
           setMeterState({loading:false,error:message})
        }
    }


    useEffect(() => {
       authHeaders()
    }, [])
    
   console.log(meterState.error)

    return (
        <Box>
            
            <Heading textAlign={"center"} fontSize={"1.2rem"}>{ name?name:"Provider"}</Heading>
            {
                meterState.loading && (
                    <Center>
                        <Spinner/>
                    </Center>
                ) 
            }
            <form onSubmit={confirmMeter}>
                <FormControl mb={"1.6rem"}>
                    <FormLabel>Meter type</FormLabel>
                    <Select value={data.meter_type} onChange={handleInputs} onClick={handleInputs} name="meter_type">
                        <option value="prepaid">prepaid</option>
                        <option value="postpaid">postpaid</option>
                    </Select>
                </FormControl>
                <Grid gridTemplateColumns={{ base: "repeat(2,1fr)" }} gap={"1rem"}>
                      
                    <FormControl mb={"1.6rem"}>
                        <FormLabel>Meter number</FormLabel>
                        <Input value={meterNumber} onChange={handleMeter} name="meter_number" isRequired/>
                    </FormControl>
                    <Button type="submit" mt={"2rem"} colorScheme="blue" width={"5rem"} fontSize={"0.7rem"}>verify</Button>
                </Grid>
                {
                    meterUser && (
                        <Box fontSize={"0.8rem"}>
                            <Text>customer name : {meterUser.Customer_Name }</Text>
                            <Text>meter number : {meterUser.Meter_Number }</Text>
                            <Text> address : {meterUser.Address }</Text>
                        </Box>
                    )
                }

                {
                    meterState.error.length>0 && (
                        <Center>
                            <Text color={"red"}>{ meterState.error}</Text>
                        </Center>
                )
                }
            </form>

            <form onSubmit={handleSubmit}>
                
                <FormControl mb={"1.6rem"}>
                    <FormLabel>Amount</FormLabel>
                    <Input value={data.Amount} onChange={handleInputs} name="Amount" isRequired/>
                </FormControl>

                <FormControl mb={"1.6rem"}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input value={data.Phone} onChange={handleInputs} name="Phone" isRequired/>
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
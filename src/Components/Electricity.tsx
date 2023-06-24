 


import { Box, FormControl, FormLabel, Input, Select, Button, Heading } from "@chakra-ui/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subElectricity,updateElectricity } from "@/Services/Data-fetching-service";
import { useVtuAuth } from "@/hooks/useVTuAuth";
import { useRouter,NextRouter } from "next/router";
import { useAppSelector,useAppDispatch } from "@/redux/hooks";
import { useState, useEffect } from "react";
import { getProfileAction } from "@/redux/actions/getProfile.action";

interface provider{
    id: number;
    provider:string
}
export interface serviceType{
    id: number;
    type:string
}

const service: serviceType[] = [
    {
        id: 1,
        type:"prepaid"
    },
    {
        id: 2,
        type:"postpaid"
    },
]

export const Electricity = () => {
    const Provider: provider[] = [
        {
            id: 1,
            provider:"abuja-electric"
        },
        {
            id: 2,
            provider:"eko-electric "
        },
        {
            id: 3,
            provider:"ibadan-electric"
        },
        {
            id: 4,
            provider:"ikeja-electric"
        },
        {
            id: 5,
            provider:"jos-electric"
        },
        {
            id: 6,
            provider:"kaduna-electric"
        },
        {
            id: 7,
            provider:"kano-electric"
        },
        {
            id: 8,
            provider:"portharcourt-electric "
        },
    ]
    interface Data{
        phone: string;
        meter_number: string;
        service_id: string;
        Amount: string;
        variation_id:string
    }

    const [values, setValues] = useState<Data>({ phone: "", meter_number: "", service_id: "abuja-electric", Amount: "", variation_id: "prepaid" })
    const [loading,setLoading] = useState<boolean>(false)
    const router: NextRouter = useRouter()
    const { password, username } = useVtuAuth()

    const {accessToken } = useAppSelector(state => state.loginAuth)
    
    const { Profile } = useAppSelector(
        state => state.fetchProfile)
    
   
    const dispatch = useAppDispatch()

    const handleChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement
        setValues(prev => ({...prev,[target.name]: target.value}) )
    }


    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!accessToken) {
            toast.error("validation error")
            return
        }
        const { meter_number, service_id, variation_id, Amount, phone } = values
        const amount = parseFloat(Amount)
        if (Profile && Profile.balance < parseFloat(Amount)) {
            toast.error("insufficient funds")
            return 0;
        }
        if ( parseFloat(Amount)<=0) {
            toast.error(`${amount} naira not accepted`)
            return 0;
        }
        console.log(values)
        try { 
            setLoading(true)  
            const data = await subElectricity(username, password, meter_number, service_id, variation_id, Amount)
            if (data) {
                const { order_id: order } = data?.data
                const order_id = parseFloat(order)
                const details = { amount, order_id, phone, meter_number }
                const res = await updateElectricity(details,accessToken)
                console.log(res)
            }
            setLoading(false)
      } catch (error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message;
            setLoading(false);
            toast.error(message);
           
      }
    }

    useEffect(() => {
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    },[accessToken])

    return (
        <Box>
            <Heading fontSize={"1.2rem"} textAlign={"center"}>Electricity, steady on a frequency!</Heading>
            <Button
                colorScheme={"red"}
                position={"relative"}
                left={{ base: "22%", md: "40%" }}
                mt={"0.9rem"} mb={"0.8rem"}
                onClick={()=>router.push("/verify_card?id=electric")}
            >
                Click to verify metre
            </Button>
            <form onSubmit={handleSubmit}>
                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"} >Phone number</FormLabel>
                    <Input value={values.phone} name="phone" onChange={handleChange}   />
                </FormControl>

                <FormControl mb={"0.9rem"}>
                    <FormLabel  fontSize={"0.8rem"}>Meter number</FormLabel>
                    <Input value={ values.meter_number}  name="meter_number" onChange={handleChange} />
                </FormControl>

                <FormControl mb={"0.9rem"}>
                    <FormLabel  fontSize={"0.8rem"}>Service Provider</FormLabel>
                    <Select  fontSize={"0.8rem"} value={values.service_id}  name="service_id" onChange={handleChange}>
                        {
                            Provider?.map(item => (<option value={item.provider} key={item.id}>
                                {item.provider}
                            </option>))
                        }
                    </Select>
                </FormControl>

                <FormControl mb={"0.9rem"}>
                    <FormLabel  fontSize={"0.8rem"}>Service type</FormLabel>
                    <Select  fontSize={"0.8rem"} value={values.variation_id}  name="variation_id" onChange={handleChange}>
                        {
                            service?.map(item => (<option value={item.type} key={item.id}>
                                {item.type}
                            </option>))
                        }
                    </Select>
                </FormControl >

                 <FormControl mb={"0.9rem"}>
                    <FormLabel  fontSize={"0.8rem"}>Amount</FormLabel>
                    <Input value={values.Amount}  name="Amount" onChange={handleChange}/>
                </FormControl>
                {
                    loading?(<Button
                                isLoading
                                loadingText='Loading'
                                colorScheme='red'
                                variant='outline'
                                spinnerPlacement='start'
                                w="100%"
                            >
                                connecting
                    </Button>):(<Button type="submit" w={"100%"} colorScheme="red"  fontSize={"0.8rem"} isDisabled={parseFloat(values.Amount)>Profile?.balance}>Submit</Button>)
                }

            </form>
            <ToastContainer limit={1}/>
        </Box>
    )
}
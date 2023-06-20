import { Box, FormControl, FormLabel, Input, Select, Heading, Button } from "@chakra-ui/react"
import { Dstv, Gotv, Startimes,iCable } from "./cable-data";
import React, { useState, useEffect } from "react"
import { subCable, storeCableSub } from "@/Services/Data-fetching-service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfileAction } from "@/redux/actions/getProfile.action";
import { useVtuAuth } from "@/hooks/useVTuAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter,NextRouter } from "next/router";



interface service{
    id: string;
    service:string
}
const Provider: service[] = [
    {
        id: "dstv",
        service:"dstv"
    },
    {
        id: "gotv",
        service:"gotv"
    },
    {
        id: "startimes",
        service:"startimes"
    },
]



export const Cable = () => {
    const [plan, setPlan] = useState<iCable[]>(Dstv)
    const [service_id, setService_id] = useState<string>("dstv")
    const [phone,setPhone] = useState<string>(" 07034...")
    const [smartcard,setCard] = useState<string>("")
    const [variation_id, setVar] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [loading,setLoading] = useState<boolean>(false)

    const router:NextRouter = useRouter()
    
    const {accessToken } = useAppSelector(state => state.loginAuth)
    const {Profile} = useAppSelector(state=>state.fetchProfile)

    const dispatch = useAppDispatch()

    const {username,password,fail} = useVtuAuth()

    const handleSelected = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLSelectElement
        setService_id(target.value)
    }

    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        if (amount <= 0) {
            toast.error(`${amount} is not a valid amount `)
            return 0
        }
        if (Profile?.balance < amount) {
            toast.error("insuficient funds")
            return 0
        }
        if (!accessToken) {
            toast.error("authorization error")
            return 0
        }
        try {
            setLoading(true)
            const { data } = await subCable({ username, password, smartcard, service_id, variation_id, phone })
            const { order_id } = data.data
            if (order_id) {
                await storeCableSub({ username, password, smartcard, service_id, variation_id, phone,amount },accessToken)
            }
            setLoading(false)
            toast.success(`${amount} ${service_id} sub to ${smartcard} successful! cheers!!`)
        } catch (error:any) {
            setLoading(false)
            console.log(error)
            const message = (error.response && error.response.data && error.response.data.message)|| error.message
            toast.error(message)
        }
        
    }

    useEffect(() => {
        switch (service_id) {
            case "dstv":
                setPlan(Dstv)
                break;
            case "gotv":
                setPlan(Gotv)
                break;
            case "startimes":
                setPlan(Startimes)
                break;
        
            default:
                setPlan(Dstv)
                break;
        }
    }, [service_id])
    const sf = 139
    useEffect(() => {
        switch (variation_id) {
            case "dstv-padi":
                setAmount(2500 + sf)
                break;
            
            case "dstv-yanga":
                setAmount(6200 + sf)
                break;
            
            case "dstv-confam":
                setAmount(3500 + sf)
                break;
            
            case "dstv-confam":
                setAmount(3500 + sf)
                break;
            
            case "dstv6":
                setAmount(8300 + sf)
                break;
            
            case "dstv79":
                setAmount(10500 + sf)
                break;
            
            case "dstv7":
                setAmount(16600 + sf)
                break;
            
            case "dstv3":
                setAmount(24500 + sf)
                break;
            
            case "dstv10":
                setAmount(27500 + sf)
                break;
            
            case "dstv9":
                setAmount(36600 + sf)
                break;
            
            case "gotv-smallie":
                setAmount(1100 + sf)
                break;
            
            case "gotv-jinja":
                setAmount(2250 + sf)
                break;
            
            case "gotv-jolli":
                setAmount(3300 + sf)
                break;
            
            case "gotv-max":
                setAmount(4850 + sf)
                break;
            
            case "gotv-supa":
                setAmount(6400 + sf)
                break;
            
            case  "nova":
                setAmount(1200 + sf)
                break;
            
            case "basic":
                setAmount(2100 + sf)
                break;
            
            case "smart":
                setAmount(2800 + sf)
                break;
            
            case "classic":
                setAmount(3100 + sf)
                break;
            
            case "super":
                setAmount(5300 + sf)
                break;
        
            default:
                setAmount(0)
                break;
        }
    }, [variation_id])
    
    useEffect(() => {
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    },[accessToken])
    return (
        <Box>
            <Heading textAlign={"center"} fontSize={"1rem"}>Cable Subscription</Heading>
            <Button
                colorScheme={"red"}
                position={"relative"}
                left={{ base: "22%", md: "40%" }}
                mt={"0.9rem"} mb={"0.8rem"}
                onClick={()=>router.push("/verify_card?id=dstv")}
            >
                Click to verify smartcard
            </Button>
            <form onSubmit={handleSubmit}>
                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.9rem"}>Phone Number</FormLabel>
                    <Input fontSize={"0.9rem"} value={phone} onChange={(e:React.SyntheticEvent)=>setPhone((e.target as HTMLInputElement).value)} required/>
                </FormControl>

                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.9rem"}>Smartcard Number</FormLabel>
                    <Input fontSize={"0.9rem"} value={smartcard} onChange={(e:React.SyntheticEvent)=>setCard((e.target as HTMLInputElement).value)} required />
                </FormControl>

                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.9rem"}>Cable Provider</FormLabel>
                    <Select value={service_id} onChange={handleSelected} >
                        {
                            Provider?.map(item => (<option value={item.service} key={item.id}>{ item.service}</option>))
                        }
                   </Select>
                </FormControl>

                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.9rem"}>Cable Plan</FormLabel>
                    <Select fontSize={"0.9rem"} value={variation_id} onChange={(e:React.SyntheticEvent)=>setVar((e.target as HTMLSelectElement).value)} onClick={(e:React.SyntheticEvent)=>setVar((e.target as HTMLSelectElement).value)}>
                        {
                            plan?.map(item => (<option value={item.service} key={item.id}>{ item.desc}</option>))
                        }
                   </Select>
                </FormControl>

                 <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.9rem"}>Amount</FormLabel>
                    <Input fontSize={"0.9rem"} value={amount} readOnly/>
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
                    </Button>) : (
                            <Button w={"100%"} colorScheme="red" fontSize={"0.9rem"} type="submit" isDisabled={Profile?.balance < amount}>Submit</Button>
                            )
                }
            </form>
            <ToastContainer limit={1}/>
        </Box>
    )
}
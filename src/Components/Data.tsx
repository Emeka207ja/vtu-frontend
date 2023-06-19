import { Box,Select,Button,Input,FormControl,FormLabel,Heading } from "@chakra-ui/react"
import { network as Net, glo, mtn, airtel, mobile,Network,Plans} from "./dataInterfce"
import { useState,useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVtuAuth } from "@/hooks/useVTuAuth";
import axios from "axios"
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { buyData,storePurchase } from "@/Services/Data-fetching-service";



export const Data = () => {

    const [provider, setProvider] = useState<Network[]>(Net)
    const [plan, setPlan] = useState<Plans[]>(mtn)
    const [network, setSelected] = useState<string>("mtn")
    const [Phone, setPhone] = useState<string>("0703420...")
    const [selectedPlan, setSelectedPlan] = useState<string>("500")
    const [Amount, setPrice] = useState<number>(0)
    const [loading,setLoading ] = useState<boolean>(false)

    const { accessToken } = useAppSelector(state => state.loginAuth)
    const {Profile} = useAppSelector(state=>state.fetchProfile)

    const { username, password, fail } = useVtuAuth()
    console.log(username,password)
    
    const handleSelect = (e: React.SyntheticEvent,setFn:Function,setFunc?:Function) => {
        const target = e.target as HTMLSelectElement
        setFn(target.value)
        if (setFunc) {
            setFunc(target.value)
        }
    }
    const handleProviderSelect = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLSelectElement
        setSelected(target.value)
    }

    const handleSelect2 = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLSelectElement
        setSelectedPlan(target.value)
    }
    

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (Profile?.balance < Amount) {
            toast.error("insufficient fund")
            return 0;
        }
        if ( Amount<=0) {
            toast.error(`${Amount} not allowed`)
            return 0;
        }
        
        try {
            setLoading(true)
            const data = await buyData(username, password, Phone,network , selectedPlan)
           
            console.log("data",data)
            const { phone, order_id } = data?.data

            if (order_id &&  accessToken) {
                const sub = await storePurchase(network,phone, Amount ,order_id, accessToken)
                console.log("sub",sub)
            }
            setLoading(false)
            toast.success(`data sub of ${Amount} to ${phone} successful!`)
        } catch (error:any) {
            setLoading(false)
            console.log(error)
            toast.error(error?.message)
        }
        
    }
    
    useEffect(() => {
        switch (network) {
            case "mtn":
                setPlan(mtn)
                break;
            case "glo":
                setPlan(glo)
                break;
            case "9mobile":
                setPlan(mobile)
                break;
            case "airtel":
                setPlan(airtel)
                break;
        
            default:
                setPlan(mtn)
                break;
        }
    }, [network])

    useEffect(() => {
        switch (selectedPlan) {
            case "500":
                setPrice(159)
                break;
            case "M1024":
                setPrice(289)
                break;
            case "M2024":
                setPrice(579)
                break;
            case "3000":
                setPrice(869)
                break;
            case "5000":
                setPrice(1449)
                break;
            case "glo100x":
                setPrice(299)
                break;
            case "glo200x":
                setPrice(199)
                break;
            case "G500":
                setPrice(489)
                break;
            case "G2000":
                setPrice(1949)
                break;
            case "AIRTEL500MB":
                setPrice(159)
                break;
            case "AIRTEL1GB":
                setPrice(299)
                break;
            case "AIRTEL2GB":
                setPrice(599)
                break;
            case "AIRTEL5GB":
                setPrice(1499)
                break;
            case "9MOB1000":
                setPrice(989)
                break;
            case "9MOB34500":
                setPrice(1989)
                break;
            case "9MOB8000":
                setPrice(7969)
                break;
            case "9MOB5000":
                setPrice(9899)
                break;
        
            default:
                setPrice(0)
                break;
        }
    }, [selectedPlan, network, plan])
    
    useEffect(() => {
//         window.onload = function() {
//             document.getElementById("fontType")!.onchange = function(event) {
//             alert("Changed!");
//      };
//    }
    },[])
    // console.log(selected)
    // console.log(phone)
    // console.log(selectedPlan)
    return (
        <Box>
            <Heading fontSize={"1rem"} textAlign={"center"}>Cheap Data</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={"0.9rem"} mt={"0.3rem"}>
                    <FormLabel fontSize={"0.8rem"}>select network</FormLabel>
                    <Select onChange={handleProviderSelect}  fontSize={"0.8rem"} value={network}>
                        {
                            provider?.map(item => (<option
                                value={item.network_id}
                                key={item.id}
                            >{item.provider}</option>))
                        }
                    </Select>
                </FormControl>
                <FormControl  mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}>select plan</FormLabel>
                    <Select fontSize={"0.8rem"} onChange={handleSelect2}   onClick={handleSelect2} value={selectedPlan}>
                        {
                            plan?.map(item => (<option value={item.variation_id} key={item.plan}>{ item.plan}</option>))
                        }
                    </Select>
                </FormControl>
                <FormControl  mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}>Phone number</FormLabel>
                   <Input value={Phone} onChange={(e)=>handleSelect(e,setPhone)}  fontSize={"0.8rem"}/>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={"0.8rem"}>Plan Price</FormLabel>
                   <Input value={Amount + ` naira`}  fontSize={"0.8rem"} readOnly/>
                </FormControl>
                {
                    loading?( <Button
                                isLoading
                                loadingText='Loading'
                                colorScheme='red'
                                variant='outline'
                                spinnerPlacement='start'
                                w="100%"
                            >
                                connecting
                            </Button>):( <Button type="submit" width={"100%"} mt={"0.4rem"} isDisabled={Amount<=0||Phone.length>11||Phone.length<11} colorScheme="red">Purchase</Button>
)
                }
            </form>
            <ToastContainer limit={1}/>
        </Box>
    )
}
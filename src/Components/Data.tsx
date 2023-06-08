import { Box,Select,Button,Input,FormControl,FormLabel,Heading } from "@chakra-ui/react"
import { network, glo, mtn, airtel, mobile,Network,Plans} from "./dataInterfce"
import { useState,useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Data = () => {
    const [provider, setProvider] = useState<Network[]>(network)
    const [plan, setPlan] = useState<Plans[]>(mtn)
    const [selected, setSelected] = useState<string>("mtn")
    const [phone, setPhone] = useState<string>("0703420...")
    const [selectedPlan, setSelectedPlan] = useState<string|null>("500")
    const [price, setPrice] = useState<number>(0)
    
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
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        toast.success("thanks stopping by,soon to launch, Cheers!")
    }
    
    useEffect(() => {
        switch (selected) {
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
    }, [selected])

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
    }, [selectedPlan, selected, plan])
    
    useEffect(() => {
        window.onload = function() {
            document.getElementById("fontType")!.onchange = function(event) {
            alert("Changed!");
     };
   }
    },[])
    // console.log(selected)
    // console.log(phone)
    console.log(selectedPlan)
    return (
        <Box>
            <Heading fontSize={"1rem"} textAlign={"center"}>Cheap Data</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel fontSize={"0.8rem"}>select network</FormLabel>
                    <Select onChange={handleProviderSelect}  fontSize={"0.8rem"}>
                        {
                            provider?.map(item => (<option
                                value={item.network_id}
                                key={item.id}
                            >{item.provider}</option>))
                        }
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={"0.8rem"}>select plan</FormLabel>
                    <Select fontSize={"0.8rem"} onChange={handleSelect2}   onClick={handleSelect2}>
                        {
                            plan?.map(item => (<option value={item.variation_id} key={item.plan}>{ item.plan}</option>))
                        }
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={"0.8rem"}>select plan</FormLabel>
                   <Input value={phone} onChange={(e)=>handleSelect(e,setPhone)}  fontSize={"0.8rem"}/>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={"0.8rem"}>Price</FormLabel>
                   <Input value={price + ` naira`}  fontSize={"0.8rem"} readOnly/>
                </FormControl>

                <Button type="submit" width={"100%"} mt={"0.4rem"} isDisabled={price<=0} colorScheme="red">Purchase</Button>
            </form>
            <ToastContainer limit={1}/>
        </Box>
    )
}
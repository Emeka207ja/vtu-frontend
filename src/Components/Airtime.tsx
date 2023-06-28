import { Box, FormControl, FormLabel, Input, Select, Heading, Button } from "@chakra-ui/react"
import {useState,useEffect} from "react"
import { serviceType } from "./Electricity"
// import { airtimeUpdate } from "@/Services/Data-fetching-service"
import axios from "axios"
import { useVtuAuth } from "@/hooks/useVTuAuth"
import { purchaseAirtime } from "@/Services/Data-fetching-service"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useAppDispatch,useAppSelector } from "@/redux/hooks"

  export interface Data{
        network: string;
        amount: string;
        phone:string
}
    

interface airtime{
    network: string;
    Amount: number;
    phone: string,
    order_id: string,
    
}

export const Airtime = () => {
    const { accessToken } = useAppSelector(state => state.loginAuth)
    const dispatch = useAppDispatch()
    console.log(accessToken)
    
    const network: serviceType[] = [
        {
            id: 1,
            type:"mtn"
        },
        {
            id: 2,
            type:"glo"
        },
        {
            id: 3,
            type:"9Mobile"
        },
        {
            id: 4,
            type:"airtel"
        },
    ]
    const [data, setData] = useState<Data>({ amount: "", phone: "", network: "mtn" })
    const [result,setResult] = useState<any>(null)
    const [loading,setLoading] = useState(false)
     const { username, password,fail } = useVtuAuth()
    console.log(username, password)

    const { Profile } = useAppSelector(state => state.fetchProfile);

    async function airtimeUpdate(details: airtime) {
  
    const { Amount, network, phone, order_id } = details
      const config = {
          headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken?.slice(1,-1)}`
            }
    }
    console.log(accessToken)
    try {
        const { data } = await axios.post("https://easybuyapi.adaptable.app/api/v1/airtime",{network,phone,Amount,order_id},config)
        return data
    } catch (error) {
        console.log(error);
    }
}


    const handleInputChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLFormElement
        setData(prev=>({...prev,[target.name]:target.value}))
    }

    const handleSubmit = async (e: React.SyntheticEvent) => { 
        e.preventDefault()
      try {
            const { amount, phone, network } = data
          const Amount = parseFloat(amount)
          if (Amount > Profile?.balance) {
              toast.error("insufficient fund");
              return
          }
            setLoading(true)
          const datax = await purchaseAirtime(Amount, phone, network, username, password)
          setResult(datax)
            setLoading(false)
          if (datax) {
              const order_id = datax.data?.order_id
              await airtimeUpdate({ network, Amount, phone,order_id }
              )
           }
            console.log(datax)
            toast.success(`recharge of ${Amount} to ${phone} was successfull!`)
            setData({ amount: "", phone: "", network: "mtn" })
        } catch (error:any) {
            console.log(error)
            setLoading(false)
            toast.error(error?.message)
        }
    }

    useEffect(() => {
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
       }
    },[])
    

    return (
        <Box>
            <Heading textAlign={"center"} fontSize={"1rem"}>Cheap Airtime</Heading>
            {
                loading?"loading":""
            }
            <form onSubmit={handleSubmit}>
                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}>Phone number</FormLabel> 
                    <Input name="phone" onChange={ handleInputChange} value={data.phone}/>
                </FormControl>

                <FormControl  mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}>Network</FormLabel> 
                    <Select fontSize={"0.8rem"} name="network" onChange={ handleInputChange} value={data.network}>
                        {
                            network?.map(item => (<option value={item.type} key={item.id}>{ item.type}</option>))
                        }
                   </Select>
                </FormControl>

                <FormControl  mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}>Amount</FormLabel> 
                    <Input name="amount" onChange={ handleInputChange} value={data.amount}/>
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
                            </Button>
                            ) : <Button w={"100%"} fontSize={"0.8rem"} colorScheme="red" type="submit" isDisabled={Profile?.balance===0}>Submit</Button>
                 }
               
            </form>
            <ToastContainer limit={1}/>
        </Box>
    )
}
import { Box, FormControl, FormLabel, Input, Button,Grid,GridItem ,HStack,useColorMode } from "@chakra-ui/react"
import { useState,useEffect } from "react"
import { useFlutterwave, closePaymentModal} from 'flutterwave-react-v3';
import { useAppSelector,useAppDispatch } from "@/redux/hooks";
 import axios from "axios"
 import { fundingApi } from "@/api-folder/funding";
 import { getProfileAction } from "@/redux/actions/getProfile.action";
 import { useRouter,NextRouter } from "next/router";
 import { getProfileApi } from "@/api-folder/profile";



export const Payment = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const {Profile} = useAppSelector(state=>state.fetchProfile)
    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const [values, setValues] = useState({ amount: "", phone: "", email: "", name: "" })
    const [response,setResponse] = useState(null)
    const [balance,setBalance] = useState(0)
     const [loading,setLoading] = useState(false)
    const dispatch = useAppDispatch()

    const router = useRouter()
    const handleInputChange = (e) => {
        const target = e.target 
        setValues(prev=>({...prev,[target.name]:target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
       
    }
    const handleFunding = async (status,amount,transaction_id)=>{
        const config = {
          headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken?.slice(1,-1)}`
            }
        }
        const {data} = await axios.post(fundingApi,{status,amount,transaction_id},config)
    }
    useEffect(()=>{
       if(response?.status === "successful"){
        handleFunding(response?.status,response?.amount,response?.transaction_id)
        dispatch(getProfileAction())
         console.log(response)
           setValues({
                email:" ",
                amount:" ",
                name:" ",
                phone:" "
            })
       }
    },[response])

    const config = {
        public_key: 'FLWPUBK-18c2444abb6d6d8eb6d2b9c8366fb859-X',
        tx_ref: Date.now(),
        amount: values.amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
        email: values.email,
        phone_number: values.phone,
        name: values.name,
        },
        customizations: {
        title: 'wallet funding',
        description: 'Payment for items in cart',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

     const handleFlutterPayment = useFlutterwave(config);

     const fetchProfile = async ()=>{
         const config = {
            headers: {
                Authorization: `Bearer ${accessToken.slice(1,-1)}`
            }
        }
        try {
            setLoading(true)
            const {data} = await axios.get(getProfileApi,config)
            console.log(data)
            setLoading(false)
            setBalance(data?.balance)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
     }

     useEffect(()=>{
    
        if(response){
      
            fetchProfile()
        }
        
        fetchProfile()
     },[response])

   
    return (
        <Box mt={"2rem"}>
             <Box>
                <Grid>
                    <GridItem>
                        <Box  bg={colorMode==="light"?"red.100":"whiteAlpha.200"} borderRadius={"md"} padding={"1rem"} borderLeft={"3px solid red"}>
                            <HStack >
                                <Box>
                                    <Box paddingLeft={"0.5rem"} fontSize={"0.9rem"}>Wallet Balance</Box>
                                    <HStack>
                                        <Box paddingLeft={"0.5rem"} cursor={"pointer"}>&#8358;</Box>
                                        <Box cursor={"pointer"}>{balance }</Box>
                                    </HStack>
                                </Box>
                            
                            </HStack>
                    </Box>
                    </GridItem>
             </Grid>
            </Box>
            <form onSubmit={handleSubmit}>
                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}>Amount</FormLabel>
                    <Input value={values.amount} name="amount" onChange={handleInputChange} />
                </FormControl>

                <FormControl  mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}> Phone Number</FormLabel>
                    <Input  name="phone" onChange={handleInputChange}  value={values.phone}/>
                </FormControl>

                <FormControl  mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}>Email</FormLabel>
                    <Input  name="email" onChange={handleInputChange} type="email"  value={values.email}/>
                </FormControl>

                <FormControl  mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}>Name</FormLabel>
                    <Input  name="name" onChange={handleInputChange}  value={values.name}/>
                </FormControl>
                
                <Button w="100%" fontSize={"0.8rem"} colorScheme="blue" type="submit"
                    onClick={() => {
                        handleFlutterPayment({
                                callback: (response) => {
                                    setResponse(response)
                               
                                closePaymentModal() // this will close the modal programmatically
                            },
                            onClose: () => {},
                        });
                    }}
                >Proceed</Button>
            </form>
        </Box>
    )
}
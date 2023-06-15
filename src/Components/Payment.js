import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import { useState,useEffect } from "react"
import { useFlutterwave, closePaymentModal} from 'flutterwave-react-v3';
import { useAppSelector,useAppDispatch } from "@/redux/hooks";
 import axios from "axios"
 import { fundingApi } from "@/api-folder/funding";
 import { getProfileAction } from "@/redux/actions/getProfile.action";
 import { useRouter,NextRouter } from "next/router";



export const Payment = () => {
    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const [values, setValues] = useState({ amount: "", phone: "", email: "", name: "" })
    const [response,setResponse] = useState(null)
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
        router.push("/dashboard")
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
        public_key: 'FLWPUBK_TEST-2b94b8d2b711f2c3c8da9cd14c3adb21-X',
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

//   const fwConfig = {
//         ...config,
//         text: 'Pay with Flutterwave!',
//         callback: (response:any) => {
//         console.log(response);
//         closePaymentModal() // this will close the modal programmatically
//         },
//         onClose: () => {},
//   };

   
    return (
        <Box>
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
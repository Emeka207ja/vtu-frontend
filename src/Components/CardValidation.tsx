import { Box, Heading, FormControl, FormLabel, Select, Button, Input,FormHelperText,HStack } from "@chakra-ui/react"
import { useState } from "react";
import { useVtuAuth } from "@/hooks/useVTuAuth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { authSmartcard } from "@/Services/Data-fetching-service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, NextRouter } from "next/router";
import useQuerryString from "@/hooks/useQueryString";


interface iprovider{
    name: string;
    value:string
}

export const CardValidation = () => {
    const Provider: iprovider[] = [
        {
            name: "DSTV",
            value:"dstv"
        },
        {
            name: "GOTV",
            value:"gotv"
        },
        {
            name: "Startimes",
            value:"startimes"
        },
    ]


    const [formData, setFormData] = useState<{ smartcard: string, service_id: string }>({ smartcard: "", service_id: "dstv" })
    const [loading,setLoading] = useState<boolean>(false)
    const [data, setData] = useState<null | string>(null)

    const router:NextRouter = useRouter()
    
    const { username, password } = useVtuAuth()
    const [referral] = useQuerryString("id");
    if(referral){console.log(referral)}
    
    const handleChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLSelectElement;
        setFormData(prev => ({
            ...prev, [target.name]: target.value
        }))
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
         const {smartcard,service_id} = formData
        if (!username || !password) {
            toast.error("server error")
            return 0
        }
        if (!smartcard || !service_id) {
            toast.error(`smartcard or provider can not be submitted empty`)
            return
        }
       try {
           setLoading(true)
           setData(null)
           const response = await authSmartcard(username, password, smartcard, service_id)
           const {customer_name} = response?.data
           console.log(response)
           setLoading(false)
           setData(customer_name)
           toast.success(`${smartcard} verified!`)
           
       } catch (error: any) {
           setLoading(false)
           const message = (error.response && error.response.data && error.response.data.message)|| error.message
           toast.error(message)
           setData(null)
       }
    }


return (
        <Box mt={"3rem"}>
            <Heading textAlign={"center"} fontSize={"1rem"} mt={"0.7rem"}>Verify smartcard</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={"0.7rem"}>
                    <FormLabel fontSize={"0.8rem"}>smartcard</FormLabel>
                <Input value={formData.smartcard} name="smartcard" onChange={handleChange} />
                {
                    data ? (<FormHelperText>{ data}</FormHelperText>): ""
                }
                </FormControl>

                <FormControl mb={"0.7rem"}>
                    <FormLabel  fontSize={"0.8rem"}>choose provider</FormLabel>
                    <Select value={formData.service_id} fontSize={"0.8rem"} name="service_id" onChange={handleChange}>
                        {
                            Provider?.map(item => (<option value={item.value} key={item.value}>{item.name }</option>))
                        }
                    </Select>
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
                            </Button>): <Button type="submit" w={"100%"}  colorScheme="red">verify</Button>
            }
        </form>
        <ToastContainer limit={1} />
        <HStack>
            {
                referral ==="dstv" && (
                    <Box>
                        <Button onClick={()=>router.push("/cable")} mt={"0.9rem"}>back to cable subscription</Button>
                    </Box>
                )
            }
        </HStack>
        </Box>
    )
}
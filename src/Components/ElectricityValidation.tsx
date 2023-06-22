import { Box, FormControl, FormLabel, Heading, Button, Select, Input,FormHelperText } from "@chakra-ui/react"
import { useState } from "react";
import { authMetre } from "@/Services/Data-fetching-service";
import { useVtuAuth } from "@/hooks/useVTuAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, NextRouter } from "next/router";
import useQuerryString from "@/hooks/useQueryString";

interface iProvider{
    id: string;
    name: string;
}
interface iVar_id extends iProvider{}

export const ElectricityValidation = () => {
    const provider: iProvider[] = [
        {
            id: "abuja-electric",
            name:"abuja-electric"
        },
        {
            id: "eko-electric",
            name:"eko-electric"
        },
        {
            id: "ibadan-electric",
            name:"ibadan-electric"
        },
        {
            id: "ikeja-electric",
            name:"ikeja-electric"
        },
        {
            id: "jos-electric",
            name:"jos-electric"
        },
        {
            id: "kaduna-electric",
            name:"kaduna-electric"
        },
        {
            id: "kano-electric",
            name:"kano-electric"
        },
        {
            id: "portharcout-electric",
            name:"portharcout-electric"
        },
    ]

    const var_id: iVar_id[] = [
        {
            id: "prepaid",
            name:"prepaid"
        },
        {
            id: "postpaid",
            name:"postpaid"
        },
    ]

    const [formData, setFormData] = useState<{ prov: string, metre: string, id: string }>({ prov: "abuja-electric", metre: "", id: "prepaid" })
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<null | string>(null)

    const router: NextRouter = useRouter()
    const [referral] = useQuerryString("id");

    

    const {password,username} = useVtuAuth()

    const handleChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLSelectElement;
        setFormData(prev => ({
            ...prev, [target.name]: target.value
        }))
    }

    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        const {id,prov,metre} = formData
        if (!password || !username) {
            toast.error("authentication error")
            return 0;
        }
        if (!metre || !prov || !id) {
            toast.error("fill up all fields")
            return 0;
        }
        try {
            setLoading(true)
            setData(null)
            const data = await authMetre( username, password,prov, id, metre);
            setLoading(false)
            const {customer_name} = data?.data
            setData(customer_name)
            toast.success(`${metre} is verified`);
       } catch(error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message;
            setLoading(false);
            toast.error(message);
       }
    }

    return (
        <Box mt={"3rem"}>
            <Heading fontSize={"1rem"} textAlign={"center"}>Metre number validation</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={"0.8rem"}>
                    <FormLabel fontSize={"0.8rem"}>Metre number</FormLabel>
                    <Input value={formData.metre} name="metre" onChange={handleChange} />
                    {
                        data ? (<FormHelperText>{ data}</FormHelperText>): ""
                    }
                </FormControl>

                <FormControl mb={"0.8rem"}>
                    <FormLabel fontSize={"0.8rem"}>Provider</FormLabel>
                    <Select value={formData.prov} name="prov" onChange={handleChange}>
                        {
                            provider?.map(item => (<option value={item.name} key={item.id}>{ item.name}</option>))
                        }
                    </Select>
                </FormControl>

                <FormControl mb={"0.8rem"}>
                    <FormLabel fontSize={"0.8rem"}>metre type</FormLabel>
                    <Select value={formData.id} name="id" onChange={handleChange}>
                        {
                            var_id?.map(item => (<option value={item.name} key={item.id}>{ item.name}</option>))
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

             {
                referral ==="electric" && (
                    <Box>
                        <Button onClick={()=>router.push("/cable")} mt={"0.9rem"}>back to metre sub</Button>
                    </Box>
                )
            }
            <ToastContainer limit={1 } />
        </Box>
    )
}
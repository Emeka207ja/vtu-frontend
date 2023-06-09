import { Box, FormControl, FormLabel, Input, Select, Button, Heading } from "@chakra-ui/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";

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
        amount: string;
        variation_id:string
    }

    const [values,setValues] = useState<Data>({phone:"",meter_number:"",service_id:"",amount:"",variation_id:""})

    const handleChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement
        setValues(prev => ({...prev,[target.name]: target.value}) )
    }


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(values);
        toast.success("thanks dropping  by, soon to launch,cheers!")
    }




    return (
        <Box>
            <Heading  fontSize={"1.2rem"} textAlign={"center"}>Electricity, steady on a frequency!</Heading>
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
                    <Input value={values.amount}  name="amount" onChange={handleChange}/>
                </FormControl>

                <Button type="submit" w={"100%"} colorScheme="red"  fontSize={"0.8rem"} isDisabled={values.amount.length === 0}>Submit</Button>
            </form>
            <ToastContainer limit={1}/>
        </Box>
    )
}
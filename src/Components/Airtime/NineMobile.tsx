import { Box,Input, FormLabel, FormControl, Button } from "@chakra-ui/react";
import { useState } from "react"
import {useRouter,NextRouter} from "next/router"
export const NineMobile = () => {
 
    const router:NextRouter = useRouter()
     const [Nine, setNine] = useState<{ amount: number, phone: string,serviceID:string }>({ amount: 100, phone: "",serviceID:"etisalat" })
    
    const handleInputs = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        setNine(prev=>({...prev,[target.name]:target.value}))
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
         router.push(`/confirmAirtime?network=${Nine.serviceID}&phone=${Nine.phone}&amount=${Nine.amount}`)
    }
    return (
        <Box mt={"3rem"}>
           
            <form onSubmit={handleSubmit}>
                <FormControl mb={"2rem"}>
                    <FormLabel>Network Provider</FormLabel>
                    <Input value={Nine.serviceID} readOnly/>
                </FormControl>

                <FormControl  mb={"2rem"}>
                    <FormLabel>Amount</FormLabel>
                    <Input value={Nine.amount} name="amount" onChange={ handleInputs}/>
                </FormControl>

                <FormControl  mb={"2rem"}>
                    <FormLabel>Phone</FormLabel>
                    <Input value={Nine.phone} name="phone" onChange={ handleInputs}/>
                </FormControl>

                <Button colorScheme={"teal"} w={"100%"} type="submit">Buy</Button>
            </form>

            
        </Box>
    )
}
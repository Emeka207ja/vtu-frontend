
import { Box, Input, FormLabel, FormControl, Button } from "@chakra-ui/react";
import { useState } from "react"


export const Mtn = () => {

     const [mtn, setMtn] = useState<{ amount: number, phone: string,serviceID:string }>({ amount: 100, phone: "",serviceID:"mtn" })
    
    const handleInputs = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        setMtn(prev=>({...prev,[target.name]:target.value}))
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(mtn)
    }
    return (
        <Box mt={"3rem"}>
           
            <form onSubmit={handleSubmit}>
                <FormControl mb={"2rem"}>
                    <FormLabel>Network Provider</FormLabel>
                    <Input value={mtn.serviceID} readOnly/>
                </FormControl>

                <FormControl  mb={"2rem"}>
                    <FormLabel>Amount</FormLabel>
                    <Input value={mtn.amount} name="amount" onChange={ handleInputs}/>
                </FormControl>

                <FormControl  mb={"2rem"}>
                    <FormLabel>Phone</FormLabel>
                    <Input value={mtn.phone} name="phone" onChange={ handleInputs}/>
                </FormControl>

                <Button colorScheme={"teal"} w={"100%"} type="submit">Buy</Button>
            </form>

            
        </Box>
    )
}
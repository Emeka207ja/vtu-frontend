import { Box, Input, FormLabel, FormControl, Button } from "@chakra-ui/react";
import {useState} from "react"
import {useRouter,NextRouter} from "next/router"
export const Glo = () => {

    const router:NextRouter = useRouter()
    const [glo, setGlo] = useState<{ amount: string, phone: string,serviceID:string }>({ amount: "100", phone: "",serviceID:"glo" })
    
    const handleInputs = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        setGlo(prev=>({...prev,[target.name]:target.value}))
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        router.push(`/confirmAirtime?network=${glo.serviceID}&phone=${glo.phone}&amount=${glo.amount}`)
    }
    return (
        <Box mt={"3rem"}>
           
            <form onSubmit={handleSubmit}>
                <FormControl mb={"2rem"}>
                    <FormLabel>Network Provider</FormLabel>
                    <Input value={glo.serviceID} readOnly/>
                </FormControl>

                <FormControl  mb={"2rem"}>
                    <FormLabel>Amount</FormLabel>
                    <Input value={glo.amount} name="amount" onChange={ handleInputs}/>
                </FormControl>

                <FormControl  mb={"2rem"}>
                    <FormLabel>Phone</FormLabel>
                    <Input value={glo.phone} name="phone" onChange={ handleInputs}/>
                </FormControl>

                <Button colorScheme={"teal"} w={"100%"} type="submit">Buy</Button>
            </form>

            
        </Box>
    )
}
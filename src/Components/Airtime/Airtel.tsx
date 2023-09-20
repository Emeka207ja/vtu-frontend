import { Box, Input, FormLabel, FormControl, Button } from "@chakra-ui/react";
import {useState,useEffect} from "react"
import { genReqId } from "../History/util.service";
import { useRouter,NextRouter } from "next/router"


export const Airtel = () => {
    const [airtel, setAirtel] = useState<{ amount: string, phone: string, serviceID: string }>({ amount: "100", phone: "", serviceID: "airtel" })
    const [id,setId] = useState("")

     const router:NextRouter = useRouter()
    
    const handleInputs = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        setAirtel(prev=>({...prev,[target.name]:target.value}))
    }

     

    const handleSubmit = (e: React.SyntheticEvent) => {
       
        e.preventDefault()
        
        router.push(`/confirmAirtime?network=${airtel.serviceID}&phone=${airtel.phone}&amount=${airtel.amount}`)
       
    }
   
    return (
        <Box mt={"3rem"}>
           
            <form onSubmit={handleSubmit}>
                <FormControl mb={"2rem"}>
                    <FormLabel>Network Provider</FormLabel>
                    <Input value={airtel.serviceID } readOnly/>
                </FormControl>

                <FormControl  mb={"2rem"}>
                    <FormLabel>Amount</FormLabel>
                    <Input value={airtel.amount} name="amount" onChange={ handleInputs} />
                </FormControl>

                <FormControl  mb={"2rem"}>
                    <FormLabel>Phone</FormLabel>
                    <Input value={airtel.phone} name="phone" onChange={ handleInputs}/>
                </FormControl>

                <Button colorScheme={"teal"} w={"100%"} type={"submit"}>Buy</Button>
            </form>

            
        </Box>
    )
}
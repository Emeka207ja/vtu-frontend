import { Box, FormControl, FormLabel, Input, Select, Heading, Button } from "@chakra-ui/react"
import { Dstv, Gotv, Startimes,iCable } from "./cable-data";
import React, {useState,useEffect} from "react"

interface service{
    id: string;
    service:string
}
const Provider: service[] = [
    {
        id: "dstv",
        service:"dstv"
    },
    {
        id: "gotv",
        service:"gotv"
    },
    {
        id: "startimes",
        service:"startimes"
    },
]



export const Cable = () => {
    const [plan, setPlan] = useState<iCable[]>(Dstv)
    const [service_id, setService_id] = useState<string>("dstv")
    const [phone,setPhone] = useState<string>("")
    const [Smartcard,setCard] = useState<string>("")
    const [variation_id,setVar] = useState<string>("")

    const handleSelected = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLSelectElement
        setService_id(target.value)
    }
    const handleSubmit = (e: React.SyntheticEvent) => {
       e.preventDefault()
    }

    useEffect(() => {
        switch (service_id) {
            case "dstv":
                setPlan(Dstv)
                break;
            case "gotv":
                setPlan(Gotv)
                break;
            case "startimes":
                setPlan(Startimes)
                break;
        
            default:
                setPlan(Dstv)
                break;
        }
    },[service_id])
    return (
        <Box>
             <Heading textAlign={"center"} fontSize={"1rem"}>Cable Subscription</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.9rem"}>Phone Number</FormLabel>
                    <Input fontSize={"0.9rem"} value={phone} onChange={(e:React.SyntheticEvent)=>setPhone((e.target as HTMLInputElement).value)}/>
                </FormControl>

                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.9rem"}>Smartcard Number</FormLabel>
                    <Input fontSize={"0.9rem"} value={Smartcard} onChange={(e:React.SyntheticEvent)=>setCard((e.target as HTMLInputElement).value)}/>
                </FormControl>

                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.9rem"}>Cable Provider</FormLabel>
                    <Select value={service_id} onChange={handleSelected}>
                        {
                            Provider?.map(item => (<option value={item.service} key={item.id}>{ item.service}</option>))
                        }
                   </Select>
                </FormControl>

                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.9rem"}>Cable Plan</FormLabel>
                    <Select fontSize={"0.9rem"} value={variation_id} onChange={(e:React.SyntheticEvent)=>setVar((e.target as HTMLSelectElement).value)}>
                        {
                            plan?.map(item => (<option value={item.service} key={item.id}>{ item.desc}</option>))
                        }
                   </Select>
                </FormControl>
                <Button w={"100%"} colorScheme="red" fontSize={"0.9rem"} type="submit">Submit</Button>
            </form>
        </Box>
    )
}
import { Box, Select,Heading,FormControl,FormLabel } from "@chakra-ui/react"
import {useState,useEffect} from "react"


import { NewGoSub } from "./NewGoSub"
import { RenewGoSub } from "./RenewGoSub"

export const Gotv: React.FC = () => {
    
    const [old,setOld] = useState<boolean>(false)
    const [fresh,setFresh] = useState<boolean>(false)
    const [selected,setSelected] = useState<string>("fresh")

    const handleChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setSelected(target.value)
    }

    useEffect(()=>{
        switch (selected) {
            case "old":
                setOld(true)
                setFresh(false)
                break;
            
            case "fresh":
                setOld(false)
                setFresh(true)
                break;
        
            default:
                break;
        }
    },[selected])
    return (
        <Box mt={"2rem"}>
            <Heading fontSize={"1.2rem"} textAlign={"center"}>Gotv subscription</Heading>
            <FormControl mt={"2rem"}>
                <FormLabel>Choose subscription category</FormLabel>
                <Select value={selected} onChange={handleChange}>
                    <option value="fresh">New  Subscription</option>
                    <option value="old">Renewal Subscription</option>
                </Select>
            </FormControl>

            {
                old? (<RenewGoSub/>): fresh?(<NewGoSub/>): ""
            }
        </Box>
    )
}
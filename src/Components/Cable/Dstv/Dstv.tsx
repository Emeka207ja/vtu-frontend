import { Box, Select,Heading,FormControl,FormLabel } from "@chakra-ui/react"
import {useState,useEffect} from "react"
import { NewSub } from "./NewSub"
import { OldSub } from "./OldSub"

export const Dstv: React.FC = () => {
    
    const [old,setOld] = useState<boolean>(false)
    const [fresh,setFresh] = useState<boolean>(false)
    const [selected,setSelected] = useState<string>("new")

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
        <Box>
            <Heading>Dstv</Heading>
            <FormControl>
                <FormLabel>Renewal or fresh subscription</FormLabel>
                <Select value={selected} onChange={handleChange}>
                    <option value="fresh">New  Subscription</option>
                    <option value="old">Renewal Subscription</option>
                </Select>
            </FormControl>

            {
                old? (<OldSub/>): fresh?(<NewSub/>): ""
            }
        </Box>
    )
}
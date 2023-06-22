import {Box,Select,FormLabel,FormControl} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { ElectricityValidation } from "./ElectricityValidation"
import { CardValidation } from "./CardValidation"
import useQuerryString from "@/hooks/useQueryString";

interface iOptions{
    name: string
    value:string
}

export const VerifyCard = () => {
    const Options: iOptions[] = [
        {
            name: " Dstv and other satelite validation",
            value: "dstv"
        },
        {
            name: "Electricity  metre validation",
            value: "electricity"
        },
    ]


    const [selected, setSelected] = useState<string>("dstv")
    const [dstv,setDstv] = useState<boolean>(false)
    const [electric, setElectric] = useState<boolean>(false)
    const [referral] = useQuerryString("id");
    

    


    useEffect(() => {
        switch (selected) {
            case "dstv":
                setDstv(true)
                 setElectric(false)
                break;
            
            case "electricity":
                setElectric(true)
                 setDstv(false)
                break;
        
            default:
                
                break;
        }
        if (referral && referral === "electric") {
            setSelected("electricity")
        }
    },[selected,referral])
    return (
        <Box>
            <FormControl>
                <FormLabel fontSize={"0.9rem"} textAlign={"center"}>Choose category to verify</FormLabel>
                <Select value={selected} onChange={(e:React.SyntheticEvent)=>setSelected((e.target as HTMLSelectElement).value)}>
                    {
                        Options?.map(item => (<option value={ item.value} key={item.value}>{item.name }</option>))
                    }
                </Select>
            </FormControl>

            {
                dstv? (<CardValidation/>):electric? (<ElectricityValidation/>): ""
            }
        </Box>
    )
}


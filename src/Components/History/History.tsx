
import { Box, Heading,Select } from "@chakra-ui/react";
import { Electric} from "./Electric";
import { Dstv } from "./Dstv";
import { Data } from "./Data";
import {Debit} from "./Debit"
import { Credit } from "./Credit";
import {useState,useEffect} from "react"

interface iHistory{
    id:string;
    name:string;
}

export const History:React.FC = ()=>{
    const history:iHistory[] = [
        {
            id:"recharge",
            name:"Recharges and data subs"
        },
        {
            id:"electricity",
            name:"Electricity subscriptions"
        },
        {
            id:"dstv",
            name:"Dstv,Gotv and Startimes subscriptions"
        },
        {
            id:"debit",
            name:"Sent funds (P2P)"
        },
        {
            id:"credit",
            name:"Received funds (P2P)"
        },
    ]


    const [selected,setSelected] = useState<string>("dstv")
    const [electric,setElectric] = useState<boolean>(false)
    const [data,setData] = useState<boolean>(false)
    const [dstv,setDstv] = useState<boolean>(false)
    const [credit,setCredit] = useState<boolean>(false)
    const [debit,setDebit] = useState<boolean>(false)
    // const [] = useState<boolean>(false)

    const handleChange = (e:React.SyntheticEvent)=>{
        const target = e.target as HTMLSelectElement;
        setSelected(target.value)
    }

    useEffect(()=>{
        switch (selected) {
            case "dstv":
                setDstv(true)
                setData(true)
                setElectric(false)
                setCredit(false)
                setDebit(false)
                break;
            case "recharge":
                setDstv(false)
                setData(true)
                setElectric(false)
                setCredit(false)
                setDebit(false)
                break;
            case "debit":
                setDstv(false)
                setData(false)
                setElectric(false)
                setCredit(false)
                setDebit(true)
                break;
            case "credit":
                setDstv(false)
                setData(false)
                setElectric(false)
                setCredit(true)
                setDebit(false)
                break;
            case "electricity":
                setDstv(false)
                setData(false)
                setElectric(true)
                setCredit(false)
                setDebit(false)
                break;
        
            default:
                break;
        }
    },[selected])
    return(
        <Box>
           <Heading textAlign={"center"} fontSize={"1.2rem"} mb={"0.7rem"}> Transaction history</Heading>
           <Box>
            <Select value={selected} onChange={handleChange}>
                {
                    history?.map(item=>(<option key={item.id} value={item.id}>{item.name}</option>))
                }
            </Select>
           </Box>
            <Box mt={"2rem"}>
                        
                {
                        dstv? (<Dstv/>):data?(<Data/>):electric?(<Electric/>):debit?(<Debit/>):credit &&(<Credit/>)
                }
            </Box>
        </Box>
    )
}
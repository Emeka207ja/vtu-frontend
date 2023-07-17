import { Box, Flex, Image, Heading } from "@chakra-ui/react"
import { cable } from "./iCable"
import { Dstv } from "./Dstv/Dstv"
import { ShowMax } from "./ShowMax"
import { Gotv } from "./Gotv"
import { Startimes } from "./Startimes"
import { useState,useEffect } from "react"



export const Cable: React.FC = () => {
    const [dstv,setDstv] =useState<boolean>(false)
    const [gotv,setGotv] =useState<boolean>(false)
    const [showmax,setShow] =useState<boolean>(false)
    const [startimes, setStar] = useState<boolean>(false)
    const [selected, setSelected] = useState<string>("dstv")
    


    useEffect(() => {
        switch (selected) {
            case "dstv":
                setDstv(true)
                setGotv(false)
                setShow(false)
                setStar(false)
                break;
            case "gotv":
                setDstv(false)
                setGotv(true)
                setShow(false)
                setStar(false)
                break;
            case "startimes":
                setDstv(false)
                setGotv(false)
                setShow(false)
                setStar(true)
                break;
            case "showmax":
                setDstv(false)
                setGotv(false)
                setShow(true)
                setStar(false)
                break;
        
            default:
                break;
        }
    },[selected])
    return (
        <Box>
            {/* <Heading>Cable</Heading> */}
            <Flex alignItems={"center"} justifyContent={"space-around"}>
                {
                    cable?.map(item => {
                        return (
                            <Box
                                key={item.id}
                                w={{ base: "4rem", md: "6rem" }}
                                onClick={() => setSelected(item.id)}
                                border={item.id === selected ? "2px solid yellow" : ""}
                                borderRadius={"md"}
                            >
                                <Image src={item.image} alt={ item.id} w={"100%"} borderRadius={"md"} objectFit={"contain"}/>
                            </Box>
                        )
                    })
                }
            </Flex>
            {
                dstv?(<Dstv />):gotv?(<Gotv/>):startimes?(<Startimes/>):showmax?(<ShowMax/>):""
            }
           
        </Box>
    )
}
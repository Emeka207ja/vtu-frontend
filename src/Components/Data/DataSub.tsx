import { MtnData } from "./MtnData";
import { GloData } from "./GloData";
import { AirtelData } from "./AirtelData";
import { NinemobileData } from "./NinemobileData";
import { Box, Flex,Heading,Image,Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { provider } from "./iProfvider";
import { FlexItem } from "./FlexItem";
import { GloSme } from "./GloSme";



export const DataSub: React.FC = () => {
    const [selected, setSelected] = useState("MTN Data")
    const [mtn,setMtn] = useState<boolean>(false)
    const [airtel,setAirtel] = useState<boolean>(false)
    const [glo,setGlo] = useState<boolean>(false)
    const [gloSme,setGloSme] = useState<boolean>(false)
    const [nine,setNine] = useState<boolean>(false)
    // const [] = useState<boolean>(false)

    useEffect(() => {
        console.log(selected)

       switch (selected) {
        case "MTN Data":
               setMtn(true)
               setGlo(false)
               setNine(false)
               setAirtel(false)
               setGloSme(false)
            break;
        case "Glo Data":
               setMtn(false)
               setGlo(true)
               setNine(false)
               setAirtel(false)
               setGloSme(false)
            break;
        case "Glo SME":
               setMtn(false)
               setGlo(false)
               setGloSme(true)
               setNine(false)
               setAirtel(false)
            break;
        case "Airtel Data":
               setMtn(false)
               setGlo(false)
               setNine(false)
               setAirtel(true)
               setGloSme(false)
            break;
        case "9mobile Data":
               setMtn(false)
               setGlo(false)
               setNine(true)
               setAirtel(false)
               setGloSme(false)
            break;
       
           default:
              
            break;
       }
    },[selected])
    return (
        <Box>
            <Heading mb={"2rem"} textAlign={"center"} fontSize={"1.4rem"} >Data Service</Heading>
            <Flex alignItems={"center"} justifyContent={"space-around"}>
                {
                    provider?.map(item => {
                        return (
                        <Box w={{base:"3rem",md:"7rem"}} onClick={()=>setSelected(item.name)} key={item.name}>
                            <Image src={item.image} alt={item.name} w={ "100%"} borderRadius={"md"} objectFit={"contain"}/>
                        </Box>
                    )
                    } )
                }
            </Flex>

            <Box>
                {
                    mtn && <MtnData/>
                }
                {
                    glo && <GloData/>
                }
                {
                    airtel && <AirtelData/>
                }
                {
                    nine&& <NinemobileData/>
                }
            </Box>
        </Box>
    )
}
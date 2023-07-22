
import { Box, Image, Flex,Heading} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Airtel } from "./Airtel"
import { Mtn } from "./Mtn"
import { Glo } from "./Glo"
import { NineMobile } from "./NineMobile"


export const Airtime = () => {
    const [air,setAir] = useState<boolean>(false)
    const [selected,setSelected] = useState<string>("")
    const [mtn,setMtn] = useState<boolean>(false)
    const [glo,setGlo] = useState<boolean>(false)
    const [nine,setNine] = useState<boolean>(false)
    // const [] = useState<>()

   



    useEffect(() => {
        switch (selected) {
            case "airtel":
                setAir(true)
                setMtn(false)
                setGlo(false)
                setNine(false)
                break;
            case "mtn":
                setAir(false)
                setMtn(true)
                setGlo(false)
                setNine(false)
                break;
            case "glo":
                setAir(false)
                setMtn(false)
                setGlo(true)
                setNine(false)
                break;
            case "nine":
                setAir(false)
                setMtn(false)
                setGlo(false)
                setNine(true)
                break;
        
            default:
                 setAir(false)
                setMtn(false)
                setGlo(false)
                setNine(false)
                break;
        }
    },[selected])
    return (
        <Box>
            <Flex justifyContent={"space-around"} alignItems={"center"}>
                <Box  width={"4rem"}>
                    <Image
                        src="/assets/images/airtel.png"
                        alt="" width={"100%"}
                        objectFit={"contain"}
                        borderRadius={"lg"}
                        onClick={() => setSelected("airtel")}
                        border={air?"2px solid white":""}
                    />
                </Box>
                <Box  width={"4rem"}>
                    <Image
                        src="/assets/images/mtn.png"
                        alt="" width={"100%"}
                        objectFit={"contain"}
                        borderRadius={"lg"}
                        onClick={() => setSelected("mtn")}
                         border={mtn?"2px solid white":""}
                    />
                </Box>
                <Box  width={"4rem"}>
                    <Image
                        src="/assets/images/nine2.png"
                        alt="" width={"100%"}
                        objectFit={"contain"}
                        borderRadius={"lg"}
                        onClick={() => setSelected("nine")}
                         border={nine?"2px solid yellow":""}
                    />
                </Box>
                <Box  width={"4rem"} >
                    <Image
                        src="/assets/images/Glo.png"
                        alt="" width={"100%"}
                        objectFit={"contain"}
                        borderRadius={"lg"}
                        onClick={() => setSelected("glo")}
                         border={glo?"2px solid white":""}
                    />
                </Box>
            </Flex>

            <Box mt={"3rem"}>

                {
                    air ?
                        (<Airtel />)
                        : mtn ? (<Mtn />)
                            : nine ? (<NineMobile />)
                                : glo ? (<Glo />)
                        : (<Heading textAlign={"center"} fontSize={"1.1rem"}>Choose a network</Heading>)
                }
            </Box>
        </Box>
    )
}
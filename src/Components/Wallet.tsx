import { Box, Text, Heading,Grid,GridItem ,HStack,useColorMode,Button} from "@chakra-ui/react"
import { Payment } from "./Payment"
import {AiFillCreditCard} from "react-icons/ai"

import { useAppSelector } from "@/redux/hooks"
import { VirtualAccount } from "./Virtual_Account/VirtualAcount"
import { useState, useEffect } from "react"
import {BsBank} from "react-icons/bs"

export const Wallet = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { Profile } = useAppSelector(state => state.fetchProfile)
    const [selected,setSelected] = useState<string>("")
    const [card,setCard] = useState<boolean>(false)
    const [tf, setTf] = useState<boolean>(false)
    useEffect(() => {
        switch (selected) {
            case "card":
                setCard(true)
                setTf(false)
                break;
            case "tf":
                setTf(true)
                setCard(false)
                break;
        
            default:
                break;
        }
    },[selected])
    return (
        <Box>
         
            <Box>
                <Heading textAlign={"center"} fontSize={"1rem"} margin={"0.9rem 0"}>Fund wallet</Heading>
                <Box ml={"0.9rem"} position={"relative"} left={{md:"29rem"}}>
                    <HStack spacing={"2rem"}>
                        {/* <Button onClick={() => setSelected("card")}>
                            <AiFillCreditCard />
                            <Text textAlign={"center"}>Card payment</Text>
                        </Button> */}
                        <Box
                            onClick={() => setSelected("card")}
                            borderRadius={"md"}
                            display={"flex"}
                            alignItems={"center"}
                            bg={"blackAlpha.200"}
                            padding={"0.4rem"}
                            cursor={"pointer"}
                        >
                            <Box mr={"0.5rem"}
                            >
                                 <AiFillCreditCard />
                            </Box>
                            <Text>Card payment</Text>
                        </Box>

                        <Box
                            onClick={() => setSelected("tf")}
                            borderRadius={"md"}
                            
                            display={"flex"}
                            alignItems={"center"}
                            padding={"0.4rem"}
                            bg={"blackAlpha.200"}
                            cursor={"pointer"}
                        >
                            <Box mr={"0.5rem"}
                            >
                                 <BsBank/>
                            </Box>
                            <Text>Bank Tansfer</Text>
                        </Box>
                        {/* <Button  onClick={()=>setSelected("tf")}> <BsBank/> Bank transfer</Button> */}
                    </HStack>
                </Box>
                {
                    card && ( <Payment />)
                }
                {
                    tf&& (<VirtualAccount/>)
                }
               
            </Box>

        </Box>
    )
}
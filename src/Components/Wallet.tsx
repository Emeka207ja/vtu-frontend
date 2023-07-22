import { Box, Text, Heading,Grid,GridItem ,HStack,useColorMode,Button,Center} from "@chakra-ui/react"
import { Payment } from "./Payment"
import {AiFillCreditCard} from "react-icons/ai"

import { useAppSelector } from "@/redux/hooks"
import { VirtualAccount } from "./Virtual_Account/VirtualAcount"
import { SquadVirtAcct } from "./Virtual_Account/SquadVirtAcct"
import { useState, useEffect } from "react"
import {BsBank} from "react-icons/bs"

export const Wallet = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { Profile } = useAppSelector(state => state.fetchProfile)
    const [selected,setSelected] = useState<string>("")
    const [card,setCard] = useState<boolean>(false)
    const [tf, setTf] = useState<boolean>(false)
    const [tfZero, setTfZero] = useState<boolean>(false)

    useEffect(() => {
        switch (selected) {
            case "card":
                setCard(true)
                setTf(false)
                setTfZero(false)
                break;
            
            case "tf":
                setTf(true)
                setCard(false)
                setTfZero(false)
                break;
            
            case "tfzero":
                setTf(false)
                setCard(false)
                setTfZero(true)
                break;
        
            default:
                break;
        }
    },[selected])
    return (
        <Box>
         
            <Box>
                <Heading textAlign={"center"} fontSize={"1rem"} margin={"0.9rem 0"}>Fund wallet</Heading>
                <Box >
                    <Grid gridTemplateColumns={{base:"repeat(2,1fr)",md:"repeat(3,1fr)"}} gap={"1rem"}>
                          <Center
                            onClick={() => setSelected("card")}
                            borderRadius={"md"}
                            display={"flex"}
                            alignItems={"center"}
                            bg={"blackAlpha.200"}
                            padding={"0.4rem"}
                            cursor={"pointer"}
                            bgColor={"blue.600"}
                            
                        >
                            <Box mr={"0.5rem"}
                            >
                                 <AiFillCreditCard />
                            </Box>
                            <Text fontSize={"0.8rem"}>Card payment</Text>
                        </Center>

                        <Center
                            onClick={() => setSelected("tf")}
                            borderRadius={"md"}
                            
                            display={"flex"}
                            alignItems={"center"}
                            padding={"0.4rem"}
                            bg={"blackAlpha.200"}
                            cursor={"pointer"}
                            bgColor={"blue.600"}
                        >
                            <Box mr={"0.5rem"}
                            >
                                 <BsBank/>
                            </Box>
                            <Text fontSize={"0.8rem"}>Bank Tansfer, fee apply </Text>
                            
                        </Center>

                        <Center
                            onClick={() => setSelected("tfzero")}
                            borderRadius={"md"}
                            
                            display={"flex"}
                            alignItems={"center"}
                            padding={"0.4rem"}
                            bg={"blackAlpha.200"}
                            cursor={"pointer"}
                            bgColor={"blue.600"}
                        >
                            <Box mr={"0.5rem"}
                            >
                                 <BsBank/>
                            </Box>
                            <Text fontSize={"0.8rem"}>Bank Tansfer 0 fee</Text>
                            
                        </Center>
                       
                    </Grid>
                </Box>
                {
                    card && ( <Payment />)
                }
                {
                    tf&& (<VirtualAccount/>)
                }
                {
                    tfZero && (<SquadVirtAcct/>)
                }
               
            </Box>

        </Box>
    )
}
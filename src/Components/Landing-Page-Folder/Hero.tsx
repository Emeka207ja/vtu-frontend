
import { Box, Grid, GridItem, Heading, Text, Image, Button, Flex, HStack, Center } from "@chakra-ui/react"
import {NextRouter, useRouter} from "next/router"
import { AiOutlineUserAdd } from "react-icons/ai"
import { BiUserCheck } from "react-icons/bi"
import { Featured } from "./Featured/Featured"


export const Hero = () => {
    const router: NextRouter = useRouter();
    
    function push(route:string) {
        router.push(route)
    }

    return (
        <Box id="home">
            <Grid templateColumns={{base:"repeat(1fr)", md:"repeat(2, 1fr)"}} margin={"0 0.7rem"}>
                <GridItem  >
                    <Box marginTop={{md:"5rem"}}>
                         <Heading marginBottom={"1rem"} fontSize={"1rem"} textAlign={"center"}>Welcome to Allpoint Vtu</Heading>
                        <Text  fontSize={"0.9rem"} textAlign={"center"}>
                            Here at Allpoint Vtu, we offer you the most affordable and most cheapest data, airtime, Dstv, Gotv and Startimes subscription. Here is the right place for your Electricity subscription..
                        </Text>
                        <Box marginTop={"0.7rem"} marginLeft={"1rem"}>
                             {/* <Flex alignItems={"center"} justifyContent={"space-between"} >
                                <Button>Siginup</Button>
                                <Button>Login</Button>
                            </Flex> */}
                            <Center>
                                <HStack spacing={5}>
                                    <Button colorScheme='red' color={"white"} onClick={()=>push("/signup")}>
                                    signup
                                        <AiOutlineUserAdd/>
                                    </Button>
                                    <Button colorScheme='red' color={"white"} onClick={()=>push("/login")}>
                                        Login
                                        <BiUserCheck/>
                                    </Button>
                              </HStack>
                            </Center>
                       </Box>
                    </Box>
                </GridItem>
                <GridItem width={{ base: "20rem", md:"30rem" }}>
                    <Image src="/assets/images/hero-1.png" alt="hero image" width={"100%"} objectFit={"cover"} />
                   
                </GridItem>
            </Grid>
        </Box>
    )
}
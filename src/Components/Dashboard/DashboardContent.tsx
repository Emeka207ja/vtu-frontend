import { Box, Grid, GridItem, HStack, VStack, Flex, Heading, useColorMode } from "@chakra-ui/react"
import { useState,useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {FaWallet} from "react-icons/fa"
import {ImConnection} from "react-icons/im"
import {BiPhoneCall} from "react-icons/bi"
import {BsLightbulb} from "react-icons/bs"
import { FiMonitor } from "react-icons/fi"
import { useRouter,NextRouter } from "next/router"



export const DashboardContent = () => {
    const router: NextRouter = useRouter()
      const {accessToken } = useAppSelector(state => state.loginAuth)
    const { colorMode, toggleColorMode } = useColorMode()
    useEffect(() => {
        if(!accessToken){
            router.push("/login")
        }
    },[accessToken])
    return (
        <Box>
            <Heading fontSize={"1.4rem"} mb={"1rem"} textAlign={"center"}>Dashboard</Heading>
            <Grid>
                <GridItem>
                    <Box  bg={colorMode==="light"?"red.100":"whiteAlpha.200"} borderRadius={"md"} padding={"1rem"} borderLeft={"3px solid red"}>
                         <HStack >
                            <Box>
                                <Box paddingLeft={"0.5rem"} fontSize={"0.9rem"}>Balance</Box>
                                <HStack>
                                    <Box paddingLeft={"0.5rem"} cursor={"pointer"}>&#8358;</Box>
                                    <Box cursor={"pointer"}>0</Box>
                                </HStack>
                            </Box>
                           
                        </HStack>
                   </Box>
                </GridItem>
            </Grid>

            <Grid mt={"1rem"} templateColumns={{base:"repeat(2,1fr)", md:"repeat(3, 1fr)"}} gap={"0.7rem"}>
                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"2rem"}
                        onClick={()=>router.push("/airtime")}
                    >
                        <HStack>
                            <BiPhoneCall/>
                            <Box cursor={"pointer"}>Airtime</Box>
                        </HStack>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"2rem"}
                         onClick={()=>router.push("/data")}
                    >
                        <HStack>
                            <ImConnection />
                            <Box cursor={"pointer"}>Data</Box>
                        </HStack>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"2rem"}
                         onClick={()=>router.push("/wallet")}
                    >
                        <HStack>
                            <FaWallet />
                            <Box cursor={"pointer"}>Wallet</Box>
                        </HStack>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"2rem"}
                         onClick={()=>router.push("/electricity")}
                    >
                        <HStack>
                            <BsLightbulb />
                            <Box cursor={"pointer"}> Electricity</Box>
                        </HStack>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"2rem"}
                         onClick={()=>router.push("/cable")}
                    >
                        <HStack>
                            <FiMonitor/>
                            <Box cursor={"pointer"}>Cable sub</Box>
                        </HStack>
                    </Box>
                </GridItem>
               
            </Grid>
        </Box>
    )
}
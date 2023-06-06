import { Box, Grid, GridItem, HStack, VStack, Flex, Heading,useColorMode} from "@chakra-ui/react"
import {FaWallet} from "react-icons/fa"
import {ImConnection} from "react-icons/im"
import {BiPhoneCall} from "react-icons/bi"
import {BsLightbulb} from "react-icons/bs"
import {FiMonitor} from "react-icons/fi"



export const DashboardContent = () => {
     const { colorMode, toggleColorMode } = useColorMode()
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
                                    <Box paddingLeft={"0.5rem"}>&#8358;</Box>
                                    <Box>0</Box>
                                </HStack>
                            </Box>
                           
                        </HStack>
                   </Box>
                </GridItem>
            </Grid>

            <Grid mt={"1rem"} templateColumns={{base:"repeat(2,1fr)", md:"repeat(3, 1fr)"}} gap={"0.7rem"}>
                <GridItem>
                    <Box bg={colorMode==="light"?"blackAlpha.200":"whiteAlpha.200"} borderRadius={"md"} padding={"2rem"}>
                        <HStack>
                            <BiPhoneCall/>
                            <Box>Airtime</Box>
                        </HStack>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box bg={colorMode==="light"?"blackAlpha.200":"whiteAlpha.200"} borderRadius={"md"} padding={"2rem"}>
                        <HStack>
                            <ImConnection />
                            <Box>Data</Box>
                        </HStack>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box bg={colorMode==="light"?"blackAlpha.200":"whiteAlpha.200"} borderRadius={"md"} padding={"2rem"}>
                        <HStack>
                            <FaWallet />
                            <Box>Wallet</Box>
                        </HStack>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box bg={colorMode==="light"?"blackAlpha.200":"whiteAlpha.200"} borderRadius={"md"}  padding={"2rem"}>
                        <HStack>
                            <BsLightbulb />
                            <Box> Electricity</Box>
                        </HStack>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box bg={colorMode==="light"?"blackAlpha.200":"whiteAlpha.200"} borderRadius={"md"} padding={"2rem"}>
                        <HStack>
                            <FiMonitor/>
                            <Box>Cable sub</Box>
                        </HStack>
                    </Box>
                </GridItem>
               
            </Grid>
        </Box>
    )
}
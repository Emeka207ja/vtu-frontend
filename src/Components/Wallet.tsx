import { Box, Text, Heading,Grid,GridItem ,HStack,useColorMode} from "@chakra-ui/react"
// import { Payment } from "./Payment"
import { Payment } from "./Payment"

export const Wallet = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box>
            <Box>
                <Grid>
                    <GridItem>
                        <Box  bg={colorMode==="light"?"red.100":"whiteAlpha.200"} borderRadius={"md"} padding={"1rem"} borderLeft={"3px solid red"}>
                            <HStack >
                                <Box>
                                    <Box paddingLeft={"0.5rem"} fontSize={"0.9rem"}>Wallet Balance</Box>
                                    <HStack>
                                        <Box paddingLeft={"0.5rem"} cursor={"pointer"}>&#8358;</Box>
                                        <Box cursor={"pointer"}>0</Box>
                                    </HStack>
                                </Box>
                            
                            </HStack>
                    </Box>
                    </GridItem>
             </Grid>
            </Box>
            <Box>
                <Heading textAlign={"center"} fontSize={"1rem"} margin={"0.9rem 0"}>Fund wallet</Heading>
                <Payment/>
            </Box>

        </Box>
    )
}
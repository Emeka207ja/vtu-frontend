import { Box, HStack, Text, Flex, useColorMode,Center } from "@chakra-ui/react"
import { AiFillHome } from "react-icons/ai"
import { BsFillPeopleFill,BsFillCreditCardFill } from "react-icons/bs"
import { GrServices } from "react-icons/gr"



export const Footer: React.FC = () => {

    const {colorMode} = useColorMode()
    return (
        <Box w={"100%"} bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.100"} position={"fixed"} bottom={0} left={0} padding={"0.5rem 1rem"} boxShadow={colorMode=== "light"?"0 -2px 4px black":"0 -2px 4px white"} >
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Box cursor={"pointer"}>
                    <Box position={"relative"} left={"0.9rem"}>
                        <AiFillHome/>
                   </Box>
                    {/* <Box>Home</Box> */}
                </Box>

                <Box cursor={"pointer"}>
                    <Box position={"relative"} left={"0.4rem"}>
                        <BsFillPeopleFill/>
                   </Box>
                    {/* <Box>p2p</Box> */}
                </Box>

                <Box cursor={"pointer"}>
                    <Box position={"relative"} left={"0.9rem"}>
                        <GrServices/>
                    </Box>
                    {/* <Box>services</Box> */}
                </Box>

                <Box cursor={"pointer"}>
                    <Box position={"relative"} left={"0.5rem"}>
                         <BsFillCreditCardFill/>
                   </Box>
                    {/* <Box>card</Box> */}
                </Box>
           </Flex>
        </Box>
    )
}
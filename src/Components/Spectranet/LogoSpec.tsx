import { Box, Grid, Image,Heading,Text,useColorMode,Center,HStack } from "@chakra-ui/react"

export const SpecLogo: React.FC = () => {
     const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box mb={"2rem"} >
            <Center>
                <HStack>
                    <Box width={"4rem"} >
                        <Image src="/assets/images/Spectranet.jpg" w={"100%"} objectFit={"contain"} borderRadius={"md"}/>
                    </Box>
                    <Box
                        bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
                        borderRadius={"md"}
                        textAlign={"center"}
                        py={"0.8rem"}
                        w={"80%"}>
                        <Heading fontSize={"1rem"} mb={"0.7rem"}>Spectranet Internet Data</Heading>
                        <Text  fontSize={"0.7rem"}>Pay for Spectranet Internet Data</Text>
                    </Box>
                </HStack>
            </Center>
        </Box>
    )
}
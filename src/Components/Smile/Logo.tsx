import { Box, Grid, Image,Heading,Text,useColorMode,Center,AbsoluteCenter,HStack } from "@chakra-ui/react"

export const SmileLogo: React.FC = () => {
     const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box mb={"2rem"} >
          
            <Center>
                 <HStack>
                <Box width={"4rem"} >
                    <Image src="/assets/images/smile.jpg" w={"100%"} objectFit={"contain"} borderRadius={"md"}/>
                </Box>
                <Box bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'} borderRadius={"md"} textAlign={"center"} width={"60%"}>
                    <Heading fontSize={"1rem"} mb={"0.7rem"}>Smile Payment</Heading>
                    <Text  fontSize={"0.7rem"}>Pay for Smile Airtime and Internet Data</Text>
                </Box>
            </HStack>
           </Center>
        </Box>
    )
}
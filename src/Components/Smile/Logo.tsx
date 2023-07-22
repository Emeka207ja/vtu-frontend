import { Box, Grid, Image,Heading,Text,useColorMode,Center,AbsoluteCenter } from "@chakra-ui/react"

export const SmileLogo: React.FC = () => {
     const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box mb={"2rem"} >
            <Grid gridTemplateColumns={{base:"repeat(1,1fr)", md:"repeat(2,1fr)"}} gap={{base:"0.9rem", md:"0.1rem"}}>
                <Box width={"4rem"} position={"relative"} left={{base:"7rem",md:"14rem"}}>
                    <Image src="/assets/images/smile.jpg" w={"100%"} objectFit={"contain"} borderRadius={"md"}/>
                </Box>
                <Box bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'} borderRadius={"md"} textAlign={"center"} py={"0.8rem"}>
                    <Heading fontSize={"1.2rem"} mb={"0.7rem"}>Smile Payment</Heading>
                    <Text  fontSize={"0.8rem"}>Pay for Smile Airtime and Internet Data</Text>
                </Box>
            </Grid>
        </Box>
    )
}
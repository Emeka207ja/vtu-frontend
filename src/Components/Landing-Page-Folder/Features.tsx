import { Box, Grid, GridItem, Image, Heading, Text, HStack,VStack } from "@chakra-ui/react"
import { MdCheckCircle } from "react-icons/md"


export const Features = () => {
    return (
        <Box marginTop={"0.8rem"}>
            <Grid templateColumns={{base:"repeat(1fr)", md:"repeat(2, 1fr)"}} margin={"0 2rem"}>
                <GridItem>
                    <Box width={{base:"20rem",md:"23rem"}}>
                        <Image src="/assets/images/choose-us.png" alt="" width={"100%"}/>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box mt={{md:"2rem"}}>
                        <Heading textAlign={"center"}  fontSize={"1rem"} mb={"0.9rem"}>Our Features</Heading>
                        <Text textAlign={"center"} fontSize={"0.8rem"}>
                            Certain things are hard; making payments shouldn't be one of them. EASY BUY helps you make payments for services you enjoy right from the comfort of your home or office. The experience of total convenience,fast service delivery and easy payment is just at your fingertips Our major aim is to provide affordable and legit services Data, Cable subscription, Airtime e.t.c for our partners at large In assurance to give you the best treat, all our services and transactions are running on an automated system. Without any delay in delivery
                        </Text>

                        
                        <HStack spacing={5}>
                            <Box>
                                <MdCheckCircle/>
                            </Box>
                            <Box>
                                <Box> Earn with us:</Box>
                                <Box fontSize={"0.8rem"}>You earn money when you refer people to us and they upgrade their account.</Box>
                            </Box>
                        </HStack>
                        <HStack spacing={5}>
                            <Box>
                                <MdCheckCircle/>
                            </Box>
                            <Box>
                                <Box> Earn with us:</Box>
                                <Box fontSize={"0.8rem"}>You earn money when you refer people to us and they upgrade their account.</Box>
                            </Box>
                        </HStack>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}
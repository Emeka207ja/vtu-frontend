import {
    Box,Grid,
    GridItem,
    Image,
    Heading,
    Text,
    Card,
    CardHeader,
    CardBody
} from "@chakra-ui/react"

export const About = ()=>{
    return(
        <Box mt={"2rem"} id={"about"}>
            <Grid templateColumns={{base:"repeat(1fr)", md:"repeat(2, 1fr)"}} justifyItems={"center"} gap={"1rem"} display={{base:"grid",md:"flex"}}>
                <GridItem>
                    <Box width={{base:"20rem",md:"20rem"}}>
                        <Image src="/assets/images/about.jpg" alt="" width={"100%"} borderRadius={"md"}/>
                    </Box>
                </GridItem>
                <GridItem>
                    <Card>
                        <Heading textAlign={"center"} fontSize={"1.1rem"} mb={"0.5rem"} mt={"1rem"}>About Us</Heading>

                      <CardBody lineHeight={"2rem"}>
                          <Text 
                            textAlign={"center"} 
                            fontSize={"0.8rem"}
                           >
                                AllPoint  is a web platform where users can purchase Mobile Data Bundles, VTU Airtime, Pay Electricity Bills, TV Subscription.
                            </Text>

                            <Text 
                                textAlign={"center"}
                                fontSize={"0.8rem"}
                             >
                                We have designed our website to accommodate user needs. Providing users of our platform the opportunity to save cost, make fast, secured, efficient and rewarding purchases and bill payments. Our internet/mobile data plans work with all devices including Android, Iphone, Computers, Modems e.t.c. Data can be rollover if you re-subscribe before expiry date of current plan.
                            </Text>
                      </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </Box>
    )
}
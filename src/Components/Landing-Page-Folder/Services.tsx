import { Box, Heading, Image, Text,Grid,Card,CardHeader,CardBody } from "@chakra-ui/react"
import { serviceData } from "../servicData"
import { gridItem } from "./Featured/Featured"

export const Services = () => {

    return (
     <Box>
            <Box mb={"0.7rem"}>
                <Heading textAlign={"center"} fontSize={"1rem"} mb={"0.7rem"}>
                    Our Services
                </Heading>
                <Text textAlign={"center"} fontSize={"0.8rem"}>
                    We offer instant recharge of Airtime, Databundle, CableTV (DStv, GOtv & Startimes),and Electricity Bill Payment.
                </Text>
            </Box>
            
            <Grid gridTemplateColumns={{base:"repeat(1fr)", md:"repeat(3,1fr)"}} gap={"0.7rem"} justifyItems={"center"}>
                {
                    serviceData?.map(item=>gridItem(item))
                }
            </Grid>
    </Box>
    )
}
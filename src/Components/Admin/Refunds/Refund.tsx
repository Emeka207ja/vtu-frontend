import { refundServices } from "./icontent";
import { useState } from "react";
import { Box, Grid, Text,Card,CardBody,CardFooter,Button } from "@chakra-ui/react";

export const Refund: React.FC = () => {
    return (
        <Box>
            <Grid gridTemplateColumns={{base:"repeat(2,1fr)",md:"repeat(3,1fr)"}} gap={"1rem"}>
                {
                    refundServices.map(item => {
                        return (
                            <Card key={item.id} cursor={"pointer"} as={"a"} href={`/admin/refund/${item.id}`}>
                                <CardBody>
                                     <Text textAlign={"center"} cursor={"pointer"}>{item.name }</Text>
                               </CardBody>
                            </Card>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}
import { icontent, contentData } from "./icontent";
import { Box, Grid, Text,Card,CardBody,CardFooter,Button } from "@chakra-ui/react";

export const Admin: React.FC = () => {
    return (
        <Box>
            <Grid gridTemplateColumns={{base:"repeat(2,1fr)",md:"repeat(3,1fr)"}} gap={"1rem"}>
                {
                    contentData.map(item => {
                        return (
                            <Card key={item.id} cursor={"pointer"} as={"a"} href={`admin/${item.id}`}>
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
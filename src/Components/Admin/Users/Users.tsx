import {
    Container,
    Grid,
    Heading,
    Card,
    CardBody,
    Box
} from "@chakra-ui/react"
import { userListData } from "./userJson"

export const User: React.FC = () => {
    return (
        <Box mt={"3rem"}>
            <Heading mb={"2rem"} fontSize={"1rem"} textAlign={"center"}>User menu</Heading>
            <Grid gridTemplateColumns={{base:"repeat(2,1fr)",md:"repeat(2,1fr)"}} gap={"1rem"}>
                {
                    userListData.map(item => (
                        <Card as={"a"} href={`/admin/users${item.url}`} key={item.id}>
                            <CardBody textAlign={"center"}>{item.name }</CardBody>
                        </Card>
                    ))
                }
            </Grid>
        </Box>
    )
}
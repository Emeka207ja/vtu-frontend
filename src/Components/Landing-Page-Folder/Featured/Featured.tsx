import { featuredData } from "./FeaturedData"
import { Box, Grid, Card,CardBody,CardFooter,CardHeader, Text, Heading,Image,Center } from "@chakra-ui/react"
import { data } from "./FeaturedData"


export const Featured = () => {
    const gridItem = (value:data) => {
        return (
            <Card key={value.head} borderRadius={"md"} width={{ base: "22rem", md: "24rem" }}>
                <Center marginBottom={"1rem"} marginTop={"0.7rem" }>
                        <Image src={value?.icon} alt="" width={ "2rem"} />
                    </Center>
                <CardHeader textAlign={"center"} fontSize={"0.9rem"}>{value.head}</CardHeader>
                <CardBody>
                    <Box>
                        <Text fontSize={"0.8rem"}>{value.content }</Text>
                    </Box>
                </CardBody>
          </Card>
        )
    }
    return (
        <Box  id="featured">
            <Grid gridTemplateColumns={{base:"repeat(1fr)", md:"repeat(3,1fr)"}} gap={"0.7rem"} justifyItems={"center"}>
                {
                    featuredData?.map(item=>gridItem(item))
                }
            </Grid>
        </Box>
    )
}
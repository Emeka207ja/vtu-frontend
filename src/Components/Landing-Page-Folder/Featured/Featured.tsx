import { featuredData } from "./FeaturedData"
import { Box, Grid, Card,CardBody,CardFooter,CardHeader, Text, Heading,Image,Center } from "@chakra-ui/react"
import { data } from "./FeaturedData"

 export const gridItem = (value:data) => {
        return (
            <Card key={value.head} borderRadius={"md"} >
                <Center marginBottom={"1rem"} marginTop={"0.7rem" }>
                        <Image src={value?.icon} alt="" width={ "2rem"} />
                    </Center>
                <CardHeader textAlign={"center"} fontSize={"0.9rem"}>{value.head}</CardHeader>
                <CardBody>
                    <Box>
                        <Text fontSize={"0.8rem"} textAlign={"center"} >{value.content }</Text>
                    </Box>
                </CardBody>
          </Card>
        )
    }

export const Featured = () => {
   
    return (
        <Box  id="featured">
            <Grid gridTemplateColumns={{base:"repeat(1fr)", md:"repeat(2,1fr)"}} gap={"0.7rem"} justifyItems={"center"}>
                {
                    featuredData?.map(item=>gridItem(item))
                }
            </Grid>
        </Box>
    )
}
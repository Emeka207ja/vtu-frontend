import { Box, Grid, Text, Image ,Heading,HStack,Card,CardBody,CardHeader,Button,CardFooter} from "@chakra-ui/react";
import { insuranceData } from "./iInsurance";
import { NextRouter,useRouter } from "next/router";

export const Insurance: React.FC = () => {
    const router:NextRouter = useRouter()
    return (
        <Box>
            {/* <Heading fontSize={"1rem"} textAlign={"center"}>Insurance</Heading> */}
            <Grid gridTemplateColumns={{base:"repeat(1,1fr)",md:"repeat(3,1fr)"}} gap={"0.7rem"}>
                {
                    insuranceData.map(item => {
                        return (
                            <Card key={item.name}>
                                <CardHeader>
                                    <Heading fontSize={"0.9rem"}>{item.name}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <HStack spacing={"0.8rem"}>
                                        <Box w={item.type==="car"?"3rem":"8rem"}>
                                            <Image src={item.image} alt={ item.type} w={"100%"} objectFit={"cover"} borderRadius={"md"} />
                                        </Box>
                                        <Box>
                                            
                                            <Text fontSize={"0.8rem"}>{item.desc }</Text>
                                        </Box>
                                 </HStack>
                                 
                                </CardBody>
                                <CardFooter>
                                    <Button colorScheme="blue" onClick={()=>router.push(`/insurance/purchase?type=${item.type}`)}>learn more</Button>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}
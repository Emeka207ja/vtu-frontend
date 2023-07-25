import { Box,Grid,Card,Button,Text,Heading,HStack,CardBody,CardFooter,Image } from "@chakra-ui/react";
import {WaecRegister} from "./WaecRegister";
import { WaecResult } from "./WaecResult";
import { waecTypeData } from "./iwaec";
import { useRouter,NextRouter } from "next/router";

export const Waec: React.FC = () => {
    const router:NextRouter = useRouter()
    return (
        <Box>
            <Grid gridTemplateColumns={{base:"repeat(1,1fr)",md:"repeat(2,1fr)"}} gap={"1rem"}>
                {
                    waecTypeData.map(item => {
                        return (
                            <Card key={ item.type}>
                                <CardBody>
                                    <HStack spacing={"1rem"}>
                                        <Box w={"4rem"}>
                                            <Image src={ item.img} alt="" w={"100%"} objectFit={"contain"} borderRadius={"md"} />
                                        </Box>
                                        <Box>
                                            <Heading fontSize={"0.9rem"}>{item.name}</Heading>
                                            <Text fontSize={"0.7rem" }>{item.desc }</Text>
                                        </Box>
                                    </HStack>
                                </CardBody>
                                <CardFooter>
                                     <Button colorScheme="blue" onClick={()=>router.push(`/waec/purchase?type=${item.type}`)}>proceed</Button>
                               </CardFooter>
                            </Card>
                        )
                    })
                }
           </Grid>
        </Box>
    )
}
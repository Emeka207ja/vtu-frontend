
import {
    Box,
    Grid,
    GridItem,
    Heading,
    
    Image,
   
    Center,
    Card,
    CardHeader,
    CardBody,
   
} from "@chakra-ui/react"
import {NextRouter, useRouter} from "next/router"
import { AiOutlineUserAdd } from "react-icons/ai"
import { BiUserCheck } from "react-icons/bi"
import { Featured } from "./Featured/Featured"


export const Hero = () => {
    const router: NextRouter = useRouter();
    
    function push(route:string) {
        router.push(route)
    }

    return (
        <Box id="home">
            <Grid templateColumns={{base:"repeat(1fr)", md:"repeat(2, 1fr)"}} >
                <GridItem  >
                    <Card marginTop={{md:"5rem"}} >
                        <CardHeader>
                            <Heading marginBottom={"1rem"} fontSize={"1rem"} textAlign={"center"}>Welcome to Allpoint </Heading>
                        </CardHeader>
                        <CardBody>
                            <Center  fontSize={"0.9rem"} textAlign={"center"} lineHeight={"2rem"}>
                                Here at Allpoint , we offer you the most affordable and most cheapest data, airtime, Dstv, Gotv and Startimes subscription. Here is the right place for your Electricity subscription..
                            </Center>
                        </CardBody>
                        
                    </Card>
                </GridItem>
                <GridItem width={{ base: "20rem", md:"25rem" }}>
                    <Image src="/assets/images/hero-1.png" alt="hero image" width={"100%"} objectFit={"cover"} />
                   
                </GridItem>
            </Grid>
            
        </Box>
    )
}
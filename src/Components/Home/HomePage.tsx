import { Box, Text, Grid, Flex, Card, CardBody, CardHeader, Image, Button } from "@chakra-ui/react"
import {WiDirectionRight} from "react-icons/wi"

export const HomePage: React.FC = () => {
    return (
        <Box>
            <Card position={"relative"}>
                <CardHeader></CardHeader>
                <CardBody>
                    <Flex alignItems={"center"} justifyContent={"center"}>
                        <Box width={{md:"40%"}}>
                            <Image src="/assets/images/banner.jpg" w={"100%"}  />  
                           
                        </Box>
                        <Button colorScheme="blue" position={"absolute"} bottom={"1rem" }>login <WiDirectionRight fontSize={"1rem"}/> </Button>
                    </Flex>
                </CardBody>
            </Card>
        </Box>
    )
}
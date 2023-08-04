import { Box, Image, Card, CardHeader, CardBody,HStack,Heading,Text } from "@chakra-ui/react"
import { iLabel } from "./iLabel"


export const Label: React.FC<{image:string}> = (prop) => {
    const { image } = prop
    
    return (
        <Card>
            <CardHeader>
                <Heading fontSize={"1rem"}>Foreign Airtime</Heading>
            </CardHeader>
            <CardBody>
                <HStack spacing={"1rem"}>
                    <Box w={ "4rem"}>
                        <Image src={image?image:"/assets/images/int.jpg" } w={"100%"} objectFit={"contain"} borderRadius={"md"}/>
                    </Box>
                    <Box>
                        <Text fontSize={"0.8rem"}>For purchasing airtime across the Globe</Text>
                    </Box>
               </HStack>
            </CardBody>
        </Card>
    )
}
import { Box, Text, Image, Card,CardHeader,CardBody,HStack,Heading } from "@chakra-ui/react"
import { iInsure } from "./iInsurance"


export const TopLabel: React.FC<iInsure> = (prop) => {
    const {image,name,desc,type,insurer} = prop
    return (
        <Card>
            <CardBody>
                <HStack spacing={"1rem"}>
                    <Box w={{base:"8rem",md:"4rem"}}>
                        <Image src={image} alt={type} w={ "100%"} objectFit={"contain"} borderRadius={"md"}/>
                    </Box>
                    <Box>
                        <Heading fontSize={"1rem"}>{name}</Heading>
                        <Text fontSize={"0.9rem"}>{desc}</Text>
                        {
                            insurer.length > 0 && <Text fontSize={"0.9rem"}>Insuer: { insurer}</Text>
                        }
                    </Box>
                </HStack>
           </CardBody>
        </Card>
    )
}
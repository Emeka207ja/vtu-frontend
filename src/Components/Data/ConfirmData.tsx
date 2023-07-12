import { Box, PinInput, PinInputField, HStack, Card, CardBody, CardHeader, CardFooter, Heading,Text } from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"



export const ConfirmData: React.FC = () => {
    const [serviceID] = useQuerryString("sID") 
    const [variation_code] = useQuerryString("varcode") 
    const [billers_code] = useQuerryString("biller") 
    const [amt] = useQuerryString("amt")
    return (
        <Box>
            <Card>
                <CardHeader>
                    <Heading fontSize={"1.2rem"}>Confirm data purchase</Heading>
                </CardHeader>
                <CardBody>
                    <Text>Data type : {serviceID }</Text>
                    <Text>Phone number : {billers_code }</Text>
                    <Text>Price : {amt }</Text>
                </CardBody>
            </Card>
        </Box>
    )
}
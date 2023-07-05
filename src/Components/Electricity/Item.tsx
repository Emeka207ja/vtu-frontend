import { Box, Card, CardBody, Text, Heading, CardHeader } from "@chakra-ui/react";
import { useRouter,NextRouter } from "next/router";

interface Props{
    name: string;
    keys: string;
    serviceId:string
}
export const Item = (prop: Props) => {
    const {keys,name,serviceId} = prop
    const router: NextRouter = useRouter()
    const navigate = () => {
        router.push(`/electricity/subElectric?serviceId=${serviceId}&key=${keys}`)
    }
    return (
        <Card onClick={navigate} cursor={"pointer"}>
            <CardHeader>
                <Heading fontSize={"1.2rem"}>
                    {keys}
                </Heading>
            </CardHeader>
            <CardBody>
                <Text fontSize={"0.9rem"}>
                    {name}
                </Text>
            </CardBody>
        </Card>
    )
}
import { Card, Box, Image, Text, Heading, CardBody,HStack } from "@chakra-ui/react"
import { waecTypeData,iwaec } from "./iwaec"
import { useState,useEffect } from "react"

export const LabelData: React.FC<{ type: string }> = (prop) => {

    const [Label,setLabel] = useState<iwaec|null>(null)
    const { type } = prop
    useEffect(() => {
        const selected: iwaec[] = waecTypeData.filter(item => item.type === type)
        const valueData:iwaec = selected[0]
       setLabel(valueData)
    },[type])
    return (
        <Card>
            {
                Label ? (
                    <CardBody>
                        <HStack spacing={"1rem"}>
                            <Box w={"4rem"}>
                                <Image src={ Label.img} alt="" w={"100%"} objectFit={"contain"} borderRadius={"md"} />
                            </Box>
                            <Box>
                                <Heading fontSize={"0.9rem"}>{Label.name}</Heading>
                                <Text fontSize={"0.7rem" }>{Label.desc }</Text>
                            </Box>
                        </HStack>
                </CardBody>
                ):""
          }
       </Card>
    )
}
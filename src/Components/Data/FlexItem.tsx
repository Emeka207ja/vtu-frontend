import { Box, Image, Text } from "@chakra-ui/react"

interface Prop{
    image: string;
    name:string
}
export const FlexItem = (image:string,name:string) => {
  
    
    return (
        <Box>
            <Image src={image} alt="" />
            <Box>
                <Text>{name }</Text>
            </Box>
        </Box>
    )
}
import { Box, FormControl, FormLabel, Input, Select,Heading,Button } from "@chakra-ui/react"
import { serviceType } from "./Electricity"

export const Airtime = () => {
    const network: serviceType[] = [
        {
            id: 1,
            type:"mtn"
        },
        {
            id: 2,
            type:"glo"
        },
        {
            id: 3,
            type:"9Mobile"
        },
        {
            id: 4,
            type:"Airtel"
        },
    ]
    return (
        <Box>
            <Heading textAlign={"center"} fontSize={"1rem"}>Cheap Airtime</Heading>
            <form>
                <FormControl mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}>Phone number</FormLabel> 
                    <Input/>
                </FormControl>

                <FormControl  mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}>Phone number</FormLabel> 
                    <Select fontSize={"0.8rem"}>
                        {
                            network?.map(item => (<option value={item.type} key={item.id}>{ item.type}</option>))
                        }
                   </Select>
                </FormControl>

                <FormControl  mb={"0.9rem"}>
                    <FormLabel fontSize={"0.8rem"}>Amount</FormLabel> 
                    <Input/>
                </FormControl>

                <Button w={"100%"} fontSize={"0.8rem"} colorScheme="red">Submit</Button>
            </form>
        </Box>
    )
}
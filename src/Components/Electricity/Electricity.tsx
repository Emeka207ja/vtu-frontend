import { Box,Grid,Heading } from "@chakra-ui/react";
import { distributor } from "./distributor.interface";
import { Item } from "./Item";


export const Electricity:React.FC = () => {
    return (
        <Box>
            <Grid templateColumns={{base:"repeat(2,1fr)", md:"repeat(3, 1fr)"}} gap={"0.7rem"}>
                {
                    distributor?.map(el => (<Item key={el.key} name={el.name} serviceId={ el.serviceId} keys={el.key} />))
                }
            </Grid>
        </Box>
    )
}
import { Tr,Td } from "@chakra-ui/react";
import { iairtime } from "./Data";
import { format } from 'timeago.js';
export const Airtimetable = (item:iairtime)=>{
    // if(!item.id){
    //     return 1
    // }
    console.log(item)

    return(
        <Tr>
            <Td>{item.item.id}</Td>
            <Td>{item.item.Amount}</Td>
            <Td>{item.item.network}</Td>
            <Td>{item.item.phone}</Td>
            <Td>{item.item.order_id}</Td>
            <Td>{format(item.item.created_at)}</Td>
        </Tr>
    )
}
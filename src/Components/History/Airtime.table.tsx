import { Tr,Td } from "@chakra-ui/react";
import { iairtime } from "./Data";
import { format } from 'timeago.js';
export const Airtimetable = (item:any)=>{
    // if(!item.id){
    //     return 1
    // }
    const items = item?.item
    console.log(items)

    return(
        <Tr>
            <Td>{items?.id}</Td>
            <Td>{items?.Amount}</Td>
            <Td>{items?.network}</Td>
            <Td>{items?.phone}</Td>
            <Td>{items?.order_id}</Td>
            <Td>{format(items?.created_at)}</Td>
        </Tr>
    )
}
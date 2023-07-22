import { creditP2p } from "./history.service";
import { Box,
    Table,
    Heading,
    Thead, 
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer
} from "@chakra-ui/react";
import { useAppDispatch,useAppSelector } from "@/redux/hooks";
import { Spin } from "../Spinner";
import {useState,useEffect} from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'timeago.js';

import { genReqId } from "./util.service";



export const Credit = () => {

    const [loading,setLoading] = useState<boolean>(false)
    const [success,setSuccess] = useState<boolean>(false)
    const [data,setData] = useState<any[]|[]>([])
    // cont [] = useState<>()

    const { accessToken } = useAppSelector(state => state.loginAuth)
    
    const creditHistory = async () => {
        if (!accessToken) {
            return 0
        }
        try {
            setLoading(true)
            setSuccess(false)
            const data = await creditP2p(accessToken)
            console.log(data)
            setSuccess(true);
            setData(data)
            setLoading(false)
        } catch (error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message
            setLoading(false);
            setSuccess(false)
            toast.error(message)
        }
    }
    useEffect(() => {
        if (!accessToken) {
            return 
        }
        creditHistory()

        
    }, [])
    const id = genReqId()
        console.log("idx",id)
    return(
        <Box>
            <Heading textAlign={"center"} fontSize={"1.2rem"} mb={"2rem"}>
                {
                    loading?(<Spin/>): " Received funds History"
                }
            </Heading>
            <Box>
                {
                    success && (
                        <TableContainer>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>ID</Th>
                                        <Th>Amount</Th>
                                        <Th>Sender</Th>
                                        <Th>Date</Th>
                                    
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        data?.length === 0 ? (
                                            <Tr>
                                                <Td fontSize={"0.6rem"}>Nill</Td>
                                                <Td fontSize={"0.6rem"}>Nill</Td>
                                                <Td fontSize={"0.6rem"}>Nill</Td>
                                                <Td fontSize={"0.6rem"}>Nill</Td>
                                            </Tr>
                                        ) : (
                                                data?.map((item,idx) => {
                                                    return (
                                                        <Tr key={item.id}>
                                                            <Td>{ idx+1}</Td>
                                                            <Td>{ item.amount}</Td>
                                                            <Td>{ item.sender?.email}</Td>
                                                            <Td>{ format(item.created_at)}</Td>
                                                        </Tr>
                                                    )
                                                })
                                        )
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )
                }
            </Box>
            <ToastContainer limit={1}/>
        </Box>
    )
}
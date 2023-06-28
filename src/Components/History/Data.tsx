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
import { getAirtimeHistory } from "./history.service";
import { useAppDispatch,useAppSelector } from "@/redux/hooks";
import { Spin } from "../Spinner";
import {useState,useEffect} from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Airtimetable } from "./Airtime.table";



export interface iairtime {
    Amount:number;
    created_at:string;
    id:number;
    order_id:numkber;
    network:string;
    phone:string;
    updated_at:string
}

export const Data = ()=>{

    const history :iairtime[] = [

    ]

    const [loading,setLoading] = useState<boolean>(false)
    const [success,setSuccess] = useState<boolean>(false)
    const [Airhistory,setAirHistory] = useState<iairtime[]|[]>([])


    const {accessToken} = useAppSelector(state=>state.loginAuth)
    
    const dispatch = useAppDispatch()

    const Airtme = async()=>{
        if(!accessToken){
            return 0;
        }
        try {
            setLoading(true)
            setSuccess(false)
            const data = await getAirtimeHistory(accessToken)
            if(data){
                // const {amount,id,created_at,order_id,network,phone} = data
                setAirHistory(data)
            }
            setLoading(false)
            setSuccess(true)
            // console.log(data)
        } catch (error:any) {
            console.log(error)
            const message = (error.response && error.response.data && error.response.data.message)||error.message
            toast.error(message)
            setLoading(false)
            setSuccess(false)
        }
    }

    useEffect(()=>{
        if(!accessToken){
            return 0;
        }
       Airtme()
    },[accessToken])

    console.log(Airhistory)

    return(
        <Box>
           <Heading
             textAlign={"center"}
             fontSize={"1.1rem"} 
             mb={{base:"2rem",md:"4rem"}}> 
                {
                    loading?<Spin head/>:" Data and Aitime History"
                }
           </Heading>
           {
            success&&(
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>id</Th>
                                    <Th>Amount</Th>
                                    <Th>Network</Th>
                                    <Th>Phone</Th>
                                    <Th>Order_id</Th>
                                    <Th>Date</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    Airhistory.length === 0? (
                                        <Tr>
                                            <Td>Nil</Td>
                                            <Td>Nil</Td>
                                            <Td>Nil</Td>
                                            <Td>Nil</Td>
                                            <Td>Nil</Td>
                                            <Td>Nil</Td>
                                        </Tr>
                                    ):(
                                        Airhistory.map(item =><Airtimetable item={item}/>)
                                    )
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                )
           }
           <ToastContainer limit={1}/>
        </Box>
    )
}
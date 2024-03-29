import {
    Box,
    Spinner,
    Heading,
    Center,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Text,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    HStack
} from "@chakra-ui/react";
import { useState,useEffect } from "react"
import { idata } from "./idata";
import { useAppSelector } from "@/redux/hooks";
import { getFailedTransaction,refundTransaction,cancelrefundTransaction } from "../services";
import { format } from 'timeago.js';


export const FailedData: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dataItemsArray, setDataItems] = useState<any[] | []>([])
    const [transacDetail,setTransacDetail] = useState<idata|null>(null)
    const [fetchState,setFetchState] = useState<{loading:boolean,success:boolean,err:string}>({loading:false,success:false,err:""})
    const [refundState,setRefundState] = useState<{loading:boolean,success:boolean,err:string}>({loading:false,success:false,err:""})

    const { accessToken } = useAppSelector(state => state.loginAuth)
    
    const fetchTransaction = async () => {
        if (!accessToken) {
            console.log("auth error, refresh page")
            return
        }
          
        try {
            setFetchState({ loading: true, success: false, err: "" })
            const service = "geodata"
            const data = await getFailedTransaction(service, accessToken)
            setDataItems(data)
            setFetchState({ loading: false, success: true, err: "" })
           
        } catch (error:any) {
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setFetchState({ loading: false, success: false, err: message })
             console.log(message)
        }
    }

    const getTransactionDetail = (id: number) => {
        setRefundState({ loading: false, success: false, err: "" })
        if (dataItemsArray.length === 0) {
            return
        }
        const detail: idata = dataItemsArray.find(item => item.id === id)
        console.log(detail)
        if (!detail) {
            console.log("no record found")
            return
        }
        setTransacDetail(detail)
    }

    const refundTransactionHandler = async () => {
        if (!accessToken) {
            console.log("auth error")
            return;
        }
        if (!transacDetail) {
            console.log("failed")
            return
        }
        const { requestId, profile } = transacDetail
        const user = profile.username
        if (!user) {
            console.log("username not found")
            return
        }
        const username = user.toLowerCase().trim()
        try {
            setRefundState({ loading: true, success: false, err: "" })
            const response = await refundTransaction(requestId,username!, accessToken)
            setRefundState({ loading: false, success: true, err: "" })
            await fetchTransaction()
        } catch (error: any) {
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            console.log(message)
            setRefundState({ loading: false, success: false, err: message })
        }
    }
    const cancelrefund = async () => {
        if (!accessToken) {
            console.log("auth error")
            return;
        }
        if (!transacDetail) {
            console.log("failed")
            return
        }
        const { requestId, profile } = transacDetail
        const user = profile.username
        if (!user) {
            console.log("username not found")
            return
        }
        const username = user.toLowerCase().trim()
       
        try {
            setRefundState({ loading: true, success: false, err: "" })
            const response = await cancelrefundTransaction(requestId,username, accessToken)
            setRefundState({ loading: false, success: true, err: "" })
            await fetchTransaction()
        } catch (error: any) {
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            console.log(message)
            setRefundState({ loading: false, success: false, err: message })
        }
    }

    useEffect(() => {
        fetchTransaction()
       
    },[])
   
    return (
        <Box>
            <Heading textAlign={"center"} fontSize={"1.1rem"} mb={"1rem"}>failed Geotopup Data transactions</Heading>
            {
                fetchState.loading && (
                    <Center>
                        <Spinner/>
                    </Center>
                )
            }
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>user</Th>
                        <Th>service</Th>
                        <Th>status</Th>
                        <Th>view</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            dataItemsArray.length > 0 && dataItemsArray.map(item => {
                                return (
                                    <Tr key={item.id}>
                                        <Td>{ item.profile?.username}</Td>
                                        <Td>{ item.service}</Td>
                                        <Td>{ item.success}</Td>
                                        <Td>
                                            <Button
                                                onClick={() => { onOpen(), getTransactionDetail(parseFloat(item.id)) }}
                                                cursor={"pointer"}
                                                colorScheme="blue"
                                            >view</Button>
                                       </Td>
                                    </Tr>
                                )
                            })
                        }
                        {
                            dataItemsArray.length === 0 && !fetchState.loading &&(
                                <Tr>
                                    <Td>nil</Td>
                                    <Td>nil</Td>
                                    <Td>nil</Td>
                                    <Td>nil</Td>
                                </Tr>
                            )
                        }
                       
                    </Tbody>
                </Table>
            </TableContainer>

            {/* modal */}
             {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {
                        refundState.loading ? (
                            <Center>
                                <Spinner/>
                            </Center>
                            ) : refundState.success ? <Center color={"green"}>success!</Center> : refundState.err ? (
                                    <Center>
                                        <Text>{ refundState.err}</Text>
                                    </Center>
                        ):" transaction details"
                   }
                </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {
                    transacDetail && (
                        <Box fontSize={"0.8rem"}>
                            <Text>service type : {transacDetail.service }</Text>
                            <Text>amount : &#8358; {transacDetail.amount }</Text>
                            <Text>transaction ID :  {transacDetail.requestId }</Text>
                            <Text>refund status :  {transacDetail.success }</Text>
                            <Text>user full name : {transacDetail.profile.name}</Text>
                            <Text>user phone number: {transacDetail.profile.phone}</Text>
                            <Text>transaction date : {format(transacDetail.created_at) }</Text>
                       </Box>
                    )      
                }
            </ModalBody>

            <ModalFooter>
                <HStack>
                    <Button colorScheme='red' onClick={cancelrefund}>cancel refund</Button>
                    <Button colorScheme='blue' onClick={refundTransactionHandler}>approve refund</Button>
                </HStack>
               
            </ModalFooter>
            </ModalContent>
        </Modal>
        </Box>
    )
}
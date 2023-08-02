import {
    Box, Text,
    Table, Tfoot,
    Tr, Th, Thead,
    TableCaption,
    TableContainer,
    Tbody, Td,
    Spinner,
    Heading,
    Button,
    useDisclosure,
    Modal,
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    ModalCloseButton,
    Center,
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/react"
import { ioptions } from "@/Components/DataTwo/idataTwo"
import { getAllData } from "./service"
import { useState, useEffect } from "react"
import { useAppDispatch,useAppSelector } from "@/redux/hooks"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { BsCheck2Circle } from "react-icons/bs"
import { getDatabyId } from "@/Components/DataTwo/service"
import { idataUpdate,updateData } from "./idataUpdate"

export const UpdateData: React.FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useAppDispatch()
    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const {Profile,pending,error} = useAppSelector(state=>state.fetchProfile)
    const [optionState, setOptionState] = useState<{ loading: boolean, success: boolean, err: string }>({ loading: false, success: false, err: "" })
    const [getState, setgetState] = useState<{ loading: boolean, success: boolean, err: string }>({ loading: false, success: false, err: "" })
    const [datas,setData] = useState<ioptions[]|[]>([])

    const [formdata,setFormdata] = useState<idataUpdate>(updateData)
    
    const dataHandler = async () => {
        if (!accessToken) {
            setOptionState({ loading: false, success: false, err: "please reload browser on good network" })
            return;
        }
        try {
            setOptionState({ loading: true, success: false, err: "" })
            const data: ioptions[] = await getAllData(accessToken)
            setData(data)
            console.log(data);
            setOptionState({ loading: false, success: true, err: "" })
        } catch (error:any) {
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setOptionState({ loading: false, success: false, err: message })
            console.log(error)
        }
    }

    const dataById = async (idx: number) => {
        const id:string = idx + "";
        if (!accessToken) {
            setgetState({ loading: false, success: false, err: "please reload browser on good network" })
            return;
        }
        try {
            setgetState({ loading: true, success: false, err: "" })
             setFormdata({name:"",plan_id:"",network:"",size:"",price:""})
            const data: ioptions = await getDatabyId(accessToken, id)
            const price = data.price+""
           setFormdata({name:data.name,plan_id:data.plan_id,network:data.network,size:data.size,price:price})
            console.log(data);
            setgetState({ loading: false, success: true, err: "" })
        } catch (error:any) {
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setgetState({ loading: false, success: false, err: message })
            console.log(error)
        }
    }

    const inputHandler = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setFormdata(prev => ({
            ...prev, [target.name]:target.value
        }))
    }

    useEffect(() => {
        dataHandler()
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    },[accessToken])
    return (
        <Box>
            {
                pending? (
                    <Heading textAlign={"center"}>
                        <Spinner/>
                    </Heading>
                ) : error && <Text textAlign={"center"}>{ error}</Text>
            }
            {
                 optionState.err && <Text>{ optionState.err}</Text>
            }
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Complete list of data from Geotopup</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Plan ID</Th>
                            <Th>Plan name</Th>
                            <Th>Price</Th>
                            <Th>Size</Th>
                            <Th>Update</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            optionState.loading ? (
                               <Spinner/>
                            ) : optionState.success  && datas.length > 0 && datas.map((item,id )=> {
                                return (
                                    <Tr key={item.id}>
                                        <Td>{ id+1}</Td>
                                        <Td>{ item.plan_id}</Td>
                                        <Td>{ item.name}</Td>
                                        <Td>{ item.price}</Td>
                                        <Td>{ item.size}</Td>
                                        <Td>
                                            <Button colorScheme="blue" onClick={() => { onOpen(); dataById(item.id)}} >update</Button>
                                        </Td>
                                    </Tr>
                                )
                            }) 
                       }
                    </Tbody>
            
                </Table>
            </TableContainer>
             <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                           update data information
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        <Center>
                            <form>
                                {
                                    getState.loading && (
                                        <Heading  textAlign={"center"}>
                                            <Spinner/>
                                        </Heading>
                                    )
                                }
                                <FormControl>
                                    <FormLabel>Plan Id </FormLabel>
                                    <Input name="plan_id" value={formdata.plan_id } onChange={inputHandler} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Network </FormLabel>
                                    <Input name="network" value={formdata.network } onChange={inputHandler}/>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Bundle size</FormLabel>
                                    <Input name="size" value={formdata.size } onChange={inputHandler}/>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Bundle Name </FormLabel>
                                    <Input name="name" value={formdata.name} onChange={inputHandler}/>
                                </FormControl>

                                <FormControl mb={"0.5rem"}>
                                    <FormLabel>Bundle Price </FormLabel>
                                    <Input name="price" value={formdata.price } onChange={inputHandler}/>
                                </FormControl>

                                <Button colorScheme="blue">update</Button>
                            </form>
                            </Center>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                            </Button>
                        
                        </ModalFooter>
                    </ModalContent>
                </Modal>
        </Box>
    )
}
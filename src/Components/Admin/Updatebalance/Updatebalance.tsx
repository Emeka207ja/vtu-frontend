import {
    Box,
    FormControl,
    FormLabel,
    Button,
    Heading,
    Center,
    Container,
    Input,
    Spinner,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Select,
    Flex
} from "@chakra-ui/react"
import { getUser,ipayload,updateBalance } from "./updatebalance.service"
import { useAppSelector } from "@/redux/hooks"
import { ChangeEvent, useState,useEffect } from "react"
import { iProfile } from "@/redux/interface/profileInterface"
import { useSearchParams } from "next/navigation"


export const Updatebalance: React.FC = () => {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState<string | null>(null)
    const [updating, setUpdating] = useState(false)
    const [success, setSuccess] = useState(false)
    const [updateErr, setUpdateErr] = useState<string | null>(null)
    const [user, setUser] = useState<iProfile | null>(null)
    const [amt,setAmt] = useState("")
    const [select, setSelect] = useState("add")
    
   
    const queryRouter = useSearchParams()
    const userQueryString = queryRouter.get("user")
    const { isOpen, onOpen, onClose } = useDisclosure()
   
    const { accessToken } = useAppSelector(state => state.loginAuth)
    
    const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const amtHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAmt(e.target.value)
    }
    const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelect(e.target.value)
    }
    const submitHandler = async(e:React.SyntheticEvent) => {
        e.preventDefault()
        if (!accessToken) {
            return
        }
        const sanitizedName = name.trim().toLowerCase()
        if (sanitizedName.length === 0) {
            setErr("name must not be empty")
            return
        }
       try {
           setLoading(true)
           setErr(null)
           setUser(null)
           setSuccess(false)
           setUpdateErr(null)
           setAmt("")
           const data: iProfile = await getUser(sanitizedName, accessToken)
           setUser(data)
           console.log(data)
       } catch (error:any) {
           const message = (error.response && error.response.data && error.response.data.message) || error.message
           setErr(message)
           console.log(message)
       } finally {
           setLoading(false)
       }
    }

    const updatebalanceHandler = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!accessToken) {
            return
        }
        const sanitizedName = name.trim().toLowerCase()
        const amount = parseFloat(amt)
        const id = user?.id +""
        if (!id) {
            return
        }
        const payload: ipayload = {
            type:select,
            amount
        }
       try {
            setUpdating(true)
           setUpdateErr(null)
           setSuccess(false)
            const response = await updateBalance(id, accessToken, payload)
            const data: iProfile = await getUser(sanitizedName, accessToken)
            setUser(data)
           setSuccess(true)
       } catch (error:any) {
           const message = (error.response && error.response.data && error.response.data.message) || error.message
           setUpdateErr(message)
           console.log(error)
       } finally {
           setUpdating(false)
       }
    }

    useEffect(() => {
        if (userQueryString) {
            setName(userQueryString)
        }
    },[userQueryString])

    return (
        <Container>
            <Heading textAlign={"center"} fontSize={"1rem"} mt={"1rem"}>update balance</Heading>
            {
                loading?(
                    <Center mt={"2rem"}>
                        <Spinner/>
                    </Center>
                ):err && (
                    <Center bgColor={"red"} borderRadius={"md"} mt={"2rem"}>
                    {
                        err
                    }
                    </Center>
                )
            }
            <form onSubmit={submitHandler}>
                <FormControl mt={"3rem"}>
                    <FormLabel>input username</FormLabel>
                    <Input  placeholder='bright'value={name} onChange={nameHandler} />
                </FormControl>
                <Button colorScheme="blue" w={"full"} mt={"1rem"} type="submit">search</Button>
            </form>

            {
                user && (
                    <Card mt={"2rem"}>
                        <CardHeader>user details </CardHeader>
                        <CardBody>
                            <Text>name: {user.name }</Text>
                            <Text>email: {user.email }</Text>
                            <Text>phone: {user.phone }</Text>
                            <Text>balance: {user.balance}</Text>
                            <Center>
                                <Button colorScheme="blue" onClick={()=>{onOpen(),()=>setSuccess(false)}}>update balance</Button>
                            </Center>
                        </CardBody>
                    </Card>
                )
            }

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader> update</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                        {
                            updating ? (
                                <Center>
                                    <Spinner/>
                                </Center>
                            ): updateErr ?(
                                <Center>
                                    {updateErr}
                                </Center>
                            ): success&&(
                                <Center mt={"2rem"}>
                                    success
                                </Center>
                            )
                        }
                    <form onSubmit={updatebalanceHandler}>
                        <Flex alignItems={"center"} justifyContent={"center"} direction={"column"}>
                                <FormControl>
                                    <FormLabel>
                                        balance
                                    </FormLabel>
                                    <Input isReadOnly value={user! && user.balance + "" } />
                                </FormControl>

                                <FormControl mt={"1rem"}>
                                    <FormLabel>action type</FormLabel>
                                    <Select value={select} onChange={ selectHandler}>
                                        <option value="add">add</option>
                                        <option value="minus">minus</option>
                                    </Select>
                                </FormControl>

                                <FormControl mt={"1rem"}>
                                    <FormLabel>
                                        amount
                                    </FormLabel>
                                    <Input value={amt} onChange={ amtHandler} />
                                </FormControl>
                        </Flex>
                        <Button mt={"1rem"} colorScheme="blue" type="submit" w={"full"}>update</Button>
                    </form>
                    
                </ModalBody>

                
                </ModalContent>
            </Modal>
        </Container>
    )
}
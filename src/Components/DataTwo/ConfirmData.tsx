import {
    Box,
    PinInput,
    PinInputField,
    HStack,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Heading,
    Text,
    useDisclosure,
    Modal,
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    ModalCloseButton,
    Spinner,
    Center,
    Button,
    Flex
    
} from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { useState, useEffect } from "react"
import { BsCheck2Circle } from "react-icons/bs"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { genReqId } from "../History/util.service"
import { idetails, dataSubHandler,getToken,purchaseDataHandler,ipurchase, getOptions,debitHandler,idebit } from "./service"
import { getHeaders } from "../Airtime/service"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useRouter, NextRouter } from "next/router";
import { ioptions } from "./idataTwo"



export const ConfirmDataTwo: React.FC = () => {

    const router:NextRouter = useRouter()
    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile,pending,error } = useAppSelector(state => state.fetchProfile)
    const dispatch = useAppDispatch()

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [plan] = useQuerryString("plan") 
    const [number] = useQuerryString("phone") 
    const [amt] = useQuerryString("amt")
    const [type] = useQuerryString("type")
    

    const [formState, setFormState] = useState<{ loading: boolean, success: boolean }>({ loading: false, success: false })
    const [errorMessage, setErrmsg] = useState<string | null>()
    const [auth, setAuth] = useState<{ token: string }>({ token: "" })
    const [Options, setOptions] = useState<ioptions | null>(null)
    const [value, setValue] = useState<string>("")

     const headerHandler = async () => {
        try {
            const data:{token:string} = await getToken()
            setAuth(data)
        } catch (error:any) {
            console.log(error)
        }
    }

     const handleInput = (val: string) => {
        setValue(val)
        setErrmsg(null)
    }

    const handleComplete = async (val: string) => {
        const price = parseFloat(amt)
        if (!accessToken || Object.keys(auth).length === 0) {
            setErrmsg("auth error,ensure you have good internet connection,refresh page")
            return
         }
        
        if (Profile && Profile.balance < price) {
            setErrmsg("insufficient balance")
            return
        }
        const pin: number = parseFloat(val);
        const userPin: number = Profile?.pin!
        if (userPin !== pin) {
            setErrmsg("invalid credentials")
            return
        }
        if (!Options) {
            setErrmsg("please refresh")
            return
        }
        // const phone: number = parseFloat(Phone)
         const reference: string = genReqId()
        
         const details: idetails = {
            plan,
            number,
            reference
         }
         
         const purchaseDetail: ipurchase = {
            price: price,
            phone: number,
            requestId:reference
        } 
        
        try {
            setFormState({ loading: true, success: false })
            const detail: idebit = {
                service: "geodata",
                requestId: reference,
                amount:Options.price
            }
            const response = await debitHandler(accessToken, detail)
            if (!response) {
                setErrmsg("failed, please check if you are debitted, if debitted,without value, chat admin")
                return
            }
            const data = await dataSubHandler(auth, details)
            if (data && data.status === "failed") {
                setFormState({ loading: false, success: false })
                setErrmsg(data.message)
                return
            }
            const res = await purchaseDataHandler(accessToken,purchaseDetail)
            setFormState({loading:false,success:true})
            console.log(data)
        } catch (error:any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({loading:false,success:false})
        }
       
    }


    const optionHandler = async (type:string,plan:string) => {
        if (!accessToken) {
            console.log("stopped")
            return
        }
        try {
            const data:ioptions[] = await getOptions(accessToken, type)
            const selected:ioptions[] = data.filter(item=>item.plan_id === plan)
           
            if (selected.length < 0) {
                console.log(error)
                return
            }
            const option = selected[0]
            console.log(option)
            setOptions(option)

        } catch (error: any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message;
          
        }
    }

    useEffect(() => {
         headerHandler()
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
        // const parsedData = JSON.parse()
       
    }, [accessToken])

    useEffect(() => {
        if (type && plan) {
            optionHandler(type,plan)
        }
    },[type,plan])
    
    if (Options) {
        console.log("success")
    }

    return (
        <Box>
            <Card>
                <CardHeader>
                    <Flex alignItems={"center"} justifyContent={"space-between"}>
                        <Heading fontSize={"1rem"}>Confirm data purchase</Heading>
                        <Box  color={Profile && Profile.balance<parseFloat(amt)? "red":"blue.300"}>
                            balance: 	&#8358; {Profile && Profile.balance}
                        </Box>
                   </Flex>
                    <Box textAlign={"center"}>
                        {
                            pending ? (<Spinner />) : error ? <Text color={"red"} fontSize={"0.9rem"}>{ error}</Text>:""
                        }
                    </Box>
                </CardHeader>
                <CardBody>
                    {
                        !formState.success && (
                            <Box>
                                <Text>Service : Data purchase</Text>
                                <Text>Phone number : {number}</Text>
                                <Text>Price : {amt }</Text>
                           </Box>
                        )
                    }

                    {
                        formState.success&&(
                            <Center>
                                <Box>
                                    <BsCheck2Circle />
                                    <Text color={"green"} fontSize={"1rem"}>success</Text>
                            </Box>
                            </Center>
                        )
                    }
                </CardBody>
                 <CardFooter>
                    <Box>
                        <HStack spacing={"1rem"}>
                            <Button colorScheme="red" onClick={()=>router.push("/datatwo")}>
                                {
                                    formState.success? "close": "cancel"
                                }
                            </Button>
                            {
                                !formState.success && ( <Button colorScheme="blue"  onClick={onOpen}>purchase</Button>)
                           }
                        </HStack>
                    </Box>
                </CardFooter>
            </Card>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            {
                            !formState.success && (
                                <Heading fontSize={"0.9rem"}>Input transaction pin</Heading>
                            )
                        }
                    </ModalHeader>
                    <ModalCloseButton />
                        <ModalBody>
                            {
                                formState.loading && (
                                    <Heading textAlign={"center"} mb={"0.8rem"}>
                                        <Spinner/>
                                    </Heading>
                                )
                            }
                            {
                                errorMessage && (
                                    <Box mb={"2rem"} bg={"red"} borderRadius={"md"}padding={"0.7rem 0"} transition={"all,2s"}>
                                        <Text textAlign={"center"}>{ errorMessage}</Text>
                                    </Box>
                                )
                        }
                            {
                                !formState.success && (
                                    <Center>
                                        <PinInput onChange={handleInput} onComplete={handleComplete}>
                                            <PinInputField/>
                                            <PinInputField/>
                                            <PinInputField/>
                                            <PinInputField/>
                                        </PinInput>
                                    </Center>
                                )
                        }
                            {
                                formState.success&&(
                                    <Center>
                                        <Box>
                                            <BsCheck2Circle />
                                            <Text>success</Text>
                                    </Box>
                                    </Center>
                                )
                            }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                        {/* <Button variant='ghost'>Secondary Action</Button> */}
                    </ModalFooter>
                    </ModalContent>
                </Modal>
        </Box>
    )
}
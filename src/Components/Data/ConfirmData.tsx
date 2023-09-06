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
    
} from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { useState, useEffect } from "react"
import { BsCheck2Circle } from "react-icons/bs"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { iAuth } from "../Wassce/service"
import { genReqId } from "../History/util.service"
import { idetails, dataSubHandler,storeDataSub,iDataStore, getDataVars } from "./service"
import { getHeaders } from "../Airtime/service"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useRouter, NextRouter } from "next/router";
import { iVar } from "./iProfvider"
import { debitHandler,idebit } from "../DataTwo/service"


export const ConfirmData: React.FC = () => {

    const router:NextRouter = useRouter()
    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile,pending,error } = useAppSelector(state => state.fetchProfile)
    const dispatch = useAppDispatch()

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [serviceID] = useQuerryString("sID") 
    const [variation_code] = useQuerryString("varcode") 
    const [billersCode] = useQuerryString("biller") 
    const [amt] = useQuerryString("amt")
    const [price,setPrice] = useState<number|null>(null)

    const [formState, setFormState] = useState<{ loading: boolean, success: boolean }>({ loading: false, success: false })
    const [errorMessage, setErrmsg] = useState<string | null>()
    const [auth, setAuth] = useState<iAuth>({ api_key: "", secret_key: "" })
    const [value, setValue] = useState<string>("")
    const [vars,setVars] = useState<iVar[]|[]>([])

     const headerHandler = async () => {
        try {
            const data:iAuth = await getHeaders()
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
        if (!accessToken || Object.keys(auth).length === 0) {
            setErrmsg("auth error,ensure you have good internet connection,refresh page")
            return
        }
        const pin: number = parseFloat(val);
        const userPin: number = Profile?.pin!
        if (userPin !== pin) {
            setErrmsg("invalid credentials")
            return
         }
         if (!price) {
             return
         }
        // const phone: number = parseFloat(Phone)
        const request_id:string = genReqId()
        // const phone:number = parseFloat(billersCode)
        const phone:string = billersCode
        const amount: number = parseFloat(amt)
        const details: idetails = {
            request_id,
            serviceID,
            billersCode,
            variation_code,
            phone,
            amount, 
         }
         const detail: idebit = {
             requestId: request_id,
             service: "vtdata",
             amount:price
        }
        
        try {
            setFormState({ loading: true, success: false })
            const debitResponse = await debitHandler(accessToken, detail)
           
            const data = await dataSubHandler(auth, details)
            if (data && data.code === "000") {
                const detail: iDataStore = {
                    request_id,
                    phone,
                    amount:price,
                    serviceID
                }
                const res = await storeDataSub(accessToken, detail)
               
            }
            setFormState({loading:false,success:true})
           
        } catch (error:any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({loading:false,success:false})
        }
       
    }
    const handleVars = async () => {
         if(!serviceID){
            return
         }
        try {
            const data = await getDataVars(serviceID)
            if (data) {
                const varatation = data.content?.varations
                setVars(varatation)
            }
            console.log(data)
            
        } catch (error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message
            console.log("dataVars error",message)
        }
    }

    useEffect(() => {
         headerHandler()
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    }, [accessToken])

    useEffect(() => {
        if (serviceID) {
            handleVars()
        }
    }, [serviceID])
    
    useEffect(() => {
        if (vars.length > 0) {
            const selectedArr = vars.filter(item => item.variation_code === variation_code)
            const stringAmt: string = selectedArr[0]?.variation_amount
            const amtx = parseFloat(stringAmt)
            const amt = Math.ceil(amtx)
            setPrice(amt)
          
        }
    },[vars])

    return (
        <Box>
            <Card>
                <CardHeader>
                    <Heading fontSize={"1rem"}>Confirm data purchase</Heading>
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
                                <Text>Data type : {serviceID }</Text>
                                <Text>Phone number : {billersCode}</Text>
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
                            <Button colorScheme="red" onClick={()=>router.push("/datasub")}>
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
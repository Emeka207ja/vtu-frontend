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
// import { idetails, dataSubHandler,getToken,purchaseDataHandler,ipurchase } from "./service"
import { getHeaders } from "../Airtime/service"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useRouter, NextRouter } from "next/router";
import { purchaseHandler, idetails,storeSpectranet,ispectranet, fetchVars } from "./service"
import { iAuth } from "../Wassce/service"
// import { iVars } from "./iVars"
import { idebit,debitHandler } from "../DataTwo/service"
import { iVar } from "../Data/iProfvider"



export const ConfirmSpectranet: React.FC = () => {

    const router:NextRouter = useRouter()
    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile,pending,error } = useAppSelector(state => state.fetchProfile)
    const dispatch = useAppDispatch()

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [plan] = useQuerryString("plan") 
    const [phone] = useQuerryString("phone") 
    const [amt] = useQuerryString("amt")
    const [variation_code] = useQuerryString("varCode")
    const [quantity] = useQuerryString("qty")
    const [] = useQuerryString("amt")
    const [] = useQuerryString("amt")

    const [formState, setFormState] = useState<{ loading: boolean, success: boolean }>({ loading: false, success: false })
    const [errorMessage, setErrmsg] = useState<string | null>()
    const [auth, setAuth] = useState<iAuth>({ api_key:"",secret_key:"" })
    const [value, setValue] = useState<string>("")
    const [vars, setVars] = useState<iVar[] | []>([])
    const [price,setPrice] = useState<number|null>(null)

     const headerHandler = async () => {
        try {
            const data: iAuth = await getHeaders()
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
        
        const pin: number = parseFloat(val);
        const userPin: number = Profile?.pin!
        if (userPin !== pin) {
            setErrmsg("invalid credentials")
            return
        }
        if (!price) {
            console.log("null price")
            return
        }
        // const phone: number = parseFloat(Phone)
        const reference: string = genReqId()
        const qty = parseFloat(quantity)
        const amount = parseFloat(amt)
        
         const details: idetails = {
             request_id: reference,
             phone,
             billersCode: phone,
             serviceID: "spectranet",
             variation_code,
             quantity:qty,
             amount
        }
        const debitDetail: idebit = {
            requestId: reference,
            amount: price,
            service:"vtpassSpectranet"
       }
        
        try {
            setFormState({loading:true,success:false})
            const debitResponse = await debitHandler(accessToken,debitDetail)
            const data = await purchaseHandler(auth, details)
            if (data && data.code !== "000") {
                setFormState({ loading: false, success: false })
                setErrmsg("transaction failed,try again")
                return
            }
            const product_name:string = data.content?.transactions?.product_name;
            const purchased_code: string = data.purchased_code
           
            const detail: ispectranet = {
                amount,
                phone,
                requestId: reference,
                purchased_code,
                product_name
            }
            const res = await storeSpectranet(accessToken, detail)
            setFormState({loading:false,success:true})
        } catch (error:any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({loading:false,success:false})
        }
       
    }

     const getVars = async () => {
        try {
            const data = await fetchVars()
            if (data) {
                const varations: iVar[] = data.content?.varations
                setVars(varations)
            }
            
        } catch (error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message;
            console.log(message)
        }
    }

    useEffect(() => {
        headerHandler()
        getVars()
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    }, [accessToken])
  
     useEffect(() => {
        if (vars.length > 0) {
            const selectedArr = vars.filter(item => item.variation_code === variation_code)
            const stringAmt: string = selectedArr[0]?.variation_amount
            console.log(stringAmt)
            const amtx = parseFloat(stringAmt)
            const qty = parseFloat(quantity)
            console.log(qty)
            const amt = Math.ceil(amtx*qty)
            setPrice(amt)
            console.log(amt)
        }
    },[vars])

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
                                <Text>Phone number : {phone}</Text>
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
                            <Button colorScheme="red" onClick={()=>router.push("/spectranet")}>
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
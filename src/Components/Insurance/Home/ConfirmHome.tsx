import {
    Box,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Heading,
    Text,
    PinInput,
    PinInputField,
    HStack,
    Button,
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
} from "@chakra-ui/react";
import useQuerryString from "@/hooks/useQueryString";
import { getProfileAction } from "@/redux/actions/getProfile.action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import {iAuth } from "@/Components/Wassce/service"; 
import { homeinsureHandler,iData } from "./service";
import { getHeaders } from "@/Components/Airtime/service"; 
import { genReqId } from "@/Components/History/util.service"; 
import { BsCheck2Circle } from "react-icons/bs"
import { useRouter,NextRouter } from "next/router";


export const ConfirmHome: React.FC = () => {

    const router:NextRouter = useRouter()

    const [variation_code] = useQuerryString("varcode")

    const { isOpen, onOpen, onClose } = useDisclosure()

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile } = useAppSelector(state => state.fetchProfile)
    const dispatch = useAppDispatch()

    const [phone] = useQuerryString("phone")
    const [date_of_birth] = useQuerryString("dob")
    const [serviceID] = useQuerryString("sid")
    const [price] = useQuerryString("price")
    const [business_occupation] = useQuerryString("bo")
    const [type_building] = useQuerryString("type")
    const [full_name] = useQuerryString("name")
    const [address] = useQuerryString("address")

    const [value, setValue] = useState<string>("")
    const [errorMessage, setErrmsg] = useState<string | null>()

    const [formState,setFormState] = useState<{loading:boolean,success:boolean}>({loading:false,success:false})
    
    const [auth,setAuth] = useState<iAuth>({api_key:"",secret_key:""})

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
       
        const request_id:string = genReqId()
        const billersCode: string = full_name
        const amount :number = parseFloat(price)
        const details: iData = {
            request_id,
            serviceID,
            billersCode,
            variation_code,
            date_of_birth,
            full_name,
            phone,
            amount,
            type_building,
            business_occupation,
            address
      }
      console.log(details)
        
        try {
            setFormState({loading:true,success:false})
            const data = await homeinsureHandler(auth, details)
            setFormState({loading:false,success:true})
            console.log(data)
        } catch (error:any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({loading:false,success:false})
        }
       
    }

    const headerHandler = async () => {
        try {
            const data:iAuth = await getHeaders()
            setAuth(data)
        } catch (error:any) {
            console.log(error)
        }
    }

    useEffect(() => {
        headerHandler()
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    },[accessToken])
    
    return (
        <Box>
            <Card>
                <CardHeader>
                    {
                        !formState.success&&( <Heading fontSize={"1rem"}>confirm transaction</Heading>)
                   }
                </CardHeader>

                <CardBody>
                    {
                        !formState.success && (
                            <Box>
                                <Text>service : {serviceID}</Text>
                                <Text> price : {parseFloat(price)}</Text>
                                <Text>option : {variation_code }</Text>
                                <Text>phone  number : {phone}</Text>
                                <Text>name : {full_name}</Text>
                                <Text>occupation  : {business_occupation}</Text>
                                <Text>DOB  : {date_of_birth}</Text>
                                <Text>house type  : {type_building}</Text>
                                <Text>address  : {address}</Text>
                                
                            </Box>
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
                </CardBody>

                <CardFooter>
                    <Box>
                        <HStack spacing={"1rem"}>
                            <Button colorScheme="red" onClick={()=>router.push("/insurance")}>
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
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
import { homeinsureHandler,iData,storeHomeinsurance,iHomeInsurance } from "../Home/service";
import { getHeaders } from "@/Components/Airtime/service"; 
import { genReqId } from "@/Components/History/util.service"; 
import { BsCheck2Circle } from "react-icons/bs"
import { useRouter, NextRouter } from "next/router";
import { payPersonal, idetails } from "./service"
import { getDataVars } from "@/Components/Data/service";
import { iVar } from "@/Components/Data/iProfvider";
import { idebit,debitHandler } from "@/Components/DataTwo/service";

// import { idetails } from "./service";


export const ConfirmPersonal: React.FC = () => {

    const router:NextRouter = useRouter()

    // const [variation_code] = useQuerryString("varcode")

    const { isOpen, onOpen, onClose } = useDisclosure()

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile } = useAppSelector(state => state.fetchProfile)
    const dispatch = useAppDispatch()

    const [phone] = useQuerryString("phone")
    const [dob] = useQuerryString("dob")
    const [serviceID] = useQuerryString("sid");
    const [price] = useQuerryString("price")
    const [business_occupation] = useQuerryString("bo")
    const [next_kin_name] = useQuerryString("nk")
    const [next_kin_phone] = useQuerryString("np")
    const [full_name] = useQuerryString("fn")
    const [address] = useQuerryString("ad")
    const [variation_code] = useQuerryString("vcode")

    const [value, setValue] = useState<string>("")
    const [errorMessage, setErrmsg] = useState<string | null>()

    const [formState, setFormState] = useState<{ loading: boolean, success: boolean }>({ loading: false, success: false })
    const [vars, setVars] = useState<iVar[] | []>([])
    const [InsurancePrice,setPrice] = useState<number|null>(null)
    
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
         if (!InsurancePrice) {
             return
         }
        const request_id:string = genReqId()
        const billersCode: string = full_name
        const amount: number = parseFloat(price)
        const details: idetails = {
            request_id,
            serviceID,
            billersCode,
            variation_code,
            dob,
            full_name,
            phone,
            amount,
            next_kin_name,
            business_occupation,
            address,
            next_kin_phone,
        };
        
        const debitDetails: idebit = {
            requestId: request_id,
            amount: InsurancePrice,
            service:"vtpasPersonalInsurance"
        }
        
        try {
            setFormState({ loading: true, success: false })
            const debitResponse = await debitHandler(accessToken, debitDetails)
            const data = await payPersonal(auth, details)
            if (data && data.code !== "000") {
                setFormState({ loading: false, success: false })
                 setErrmsg("transaction not successfull")
            }
             if (data && data.code === "000") {
                const product_name:string = data.content?.transactions.product_name
                const total_amount: number = data.content?.transactions.total_amount
                const requestId: string = data.requestId
                const detail: iHomeInsurance = {
                    product_name,
                    total_amount,
                    requestId
                }
                const res = await storeHomeinsurance(accessToken, detail)
            }
            setFormState({loading:false,success:true})
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

     const insuranceVars = async () => {
        try {
            const data = await getDataVars("personal-accident-insurance")
            if (data) {
                const varation: iVar[] = data.content?.varations
                setVars(varation)
               
            }
        } catch (error:any) {
            console.log(error)
        }
    }

    useEffect(() => {
        headerHandler()
        insuranceVars()
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    }, [accessToken])
    
     useEffect(() => {
         if (vars.length > 0) {
            const filtered = vars.filter(item => item.variation_code === variation_code)
            if ( filtered.length > 0) {
                const StringAmt = filtered[0]?.variation_amount
                const amt = Math.ceil(parseFloat(StringAmt))
                setPrice(amt)
           }
        }
    },[vars])
    
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
                                <Text>service: {variation_code }</Text>
                                <Text>phone  number : {phone}</Text>
                                <Text>name : {full_name}</Text>
                                <Text>occupation  : {business_occupation}</Text>
                                <Text>DOB  : {dob}</Text>
                                <Text>next_kin_name  : {next_kin_name}</Text>
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
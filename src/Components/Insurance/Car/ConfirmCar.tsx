import {
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    PinInput,
    PinInputField,
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
    HStack
} from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { useState,useEffect } from "react"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { BsCheck2Circle } from "react-icons/bs"
import { useRouter, NextRouter } from "next/router";
import { carInsuranceHandler, idetails,storeCarInsurance,iCar } from "./service"
import { genReqId } from "@/Components/History/util.service"
import { iAuth } from "@/Components/Wassce/service"
import { getHeaders } from "@/Components/Airtime/service"

export const ConfirmCarInsurance: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile } = useAppSelector(state => state.fetchProfile)
    const dispatch = useAppDispatch()

    const router:NextRouter = useRouter()

    const [formState, setFormState] = useState<{ loading: boolean, success: boolean }>({ loading: false, success: false })
    const [value, setValue] = useState<string>("")
    const [errorMessage, setErrmsg] = useState<string | null>()
    const [auth,setAuth] = useState<iAuth>({api_key:"",secret_key:""})
    const [serviceID] = useQuerryString("sid");
    const [Insured_Name] = useQuerryString("name")
    const [variation_code] = useQuerryString("vcode")
    const [Engine_Number] = useQuerryString("engine")
    const [Chasis_Number] = useQuerryString("chasis")
    const [Plate_Number] = useQuerryString("plate")
    const [Vehicle_Make] = useQuerryString("make")
    const [Vehicle_Color] = useQuerryString("color")
    const [Vehicle_Model] = useQuerryString("model")
    const [Year_of_Make] = useQuerryString("year")
    const [Contact_Address] = useQuerryString("address")
    const [price] = useQuerryString("price")
    const [phone] = useQuerryString("phone")


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
        
        const request_id:string = genReqId()
        const billersCode: string = Plate_Number
        const amount: number = parseFloat(price)
        const details: idetails = {
            request_id,
            serviceID,
            billersCode,
            variation_code,
            phone,
          
            Year_of_Make,
            Engine_Number,
            Contact_Address,
            Plate_Number,
            Vehicle_Color,
            Vehicle_Make,
            Vehicle_Model,
            Insured_Name,
            Chasis_Number
      }
    //   console.log(details)
        
        try {
            setFormState({loading:true,success:false})
            const data = await carInsuranceHandler(auth, details)
            if (data && data.code === "000") {
                const product_name:string = data.content?.transactions.product_name
                const amount: number = data.content?.transactions.amount
                const certUrl: string = data.certUrl
                const requestId: string = data.requestId
                
                const detail: iCar = {
                    product_name,
                    amount,
                    certUrl,
                    requestId
                }
                const res = await storeCarInsurance(accessToken, detail)
                console.log(detail,res)
            }
            setFormState({loading:false,success:true})
            console.log(data)
        } catch (error:any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({loading:false,success:false})
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
                        !formState.success &&  <Heading fontSize={"1rem"}>Confirm vehicle insurance purchase</Heading>
                   }
                </CardHeader>
                <CardBody>
                    {
                        !formState.success && (
                            <Box>
                                <Text>product: vehicle insurance</Text>
                                <Text>type: {variation_code}</Text>
                                <Text>Insured_Name: {Insured_Name}</Text>
                                <Text>Chasis_Number: {Chasis_Number}</Text>
                                <Text>Plate_Number: {Plate_Number}</Text>
                                <Text>Engine_Number: {Engine_Number}</Text>
                                <Text>Vehicle_Make: {Vehicle_Make}</Text>
                                <Text>Price : {price }</Text>
                            </Box>
                        )
                    }
                    
                    {
                        formState.success&&(
                            <Center>
                                <Box>
                                    <BsCheck2Circle />
                                    <Text color={"green"}>success</Text>
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
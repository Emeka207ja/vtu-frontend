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

export const ConfirmCarInsurance: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile } = useAppSelector(state => state.fetchProfile)
    const dispatch = useAppDispatch()

    const router:NextRouter = useRouter()

    const [formState, setFormState] = useState<{ loading: boolean, success: boolean }>({ loading: false, success: false })
    const [value, setValue] = useState<string>("")
    const [errorMessage, setErrmsg] = useState<string | null>()

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
    const [Amount] = useQuerryString("price")

     const handleInput = (val: string) => {
        setValue(val)
        setErrmsg(null)
    }

     const handleComplete = (val: string) => {
      
    }
    
    useEffect(() => {
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    },[accessToken])
    return (
        <Box>
            <Card>
                <CardHeader>
                    <Heading fontSize={"1rem"}>Confirm vehicle insurance purchase</Heading>
                </CardHeader>
                <CardBody>
                    <Text>product: vehicle insurance</Text>
                    <Text>type: {variation_code}</Text>
                    <Text>Price : {Amount }</Text>
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
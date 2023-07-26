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
    Spinner
} from "@chakra-ui/react";
import useQuerryString from "@/hooks/useQueryString";
import { getProfileAction } from "@/redux/actions/getProfile.action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { paymentHandler } from "./service";
import { getHeaders } from "../Airtime/service";


export const ConfirmWaec: React.FC = () => {

    const [variation_code] = useQuerryString("varcode")

    const { isOpen, onOpen, onClose } = useDisclosure()

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile } = useAppSelector(state => state.fetchProfile)
    const dispatch = useAppDispatch()

    const [Phone] = useQuerryString("phone")
    const [quantity] = useQuerryString("qty")
    const [serviceID] = useQuerryString("sid")
    const [price] = useQuerryString("amt")
    const [value, setValue] = useState<string>("")
    const [errorMessage,setErrmsg] = useState<string|null>()

    const handleInput = (val: string) => {
        setValue(val)
        setErrmsg(null)
    }

    const handleComplete = async (val: string) => {
        if (!accessToken) {
            setErrmsg("auth error,ensure you have good internet connection,refresh page")
            return
        }
        const pin: number = parseFloat(val);
        const userPin: number = Profile?.pin!
        if (userPin !== pin) {
            setErrmsg("invalid credentials")
            return
        }
       
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
                    <Heading fontSize={"1rem"}>confirm transaction</Heading>
                </CardHeader>

                <CardBody>
                    <Text>service : {variation_code }</Text>
                    <Text>Total price : {parseFloat(price)*parseFloat(quantity)}</Text>
                    <Text>quantity : {quantity }</Text>
                    <Text>phone  number : {Phone }</Text>
                </CardBody>

                <CardFooter>
                    <Box>
                        <HStack spacing={"1rem"}>
                            <Button colorScheme="red">cancel</Button>
                            <Button colorScheme="blue"  onClick={onOpen}>purchase</Button>
                        </HStack>
                    </Box>
                </CardFooter>
            </Card>
             <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Input transaction pin</ModalHeader>
                <ModalCloseButton />
                    <ModalBody>
                        {
                            errorMessage && (
                                <Box mb={"2rem"} bg={"red"} borderRadius={"md"}padding={"0.7rem 0"} transition={"all,2s"}>
                                    <Text textAlign={"center"}>{ errorMessage}</Text>
                                </Box>
                            )
                       }
                    <PinInput onChange={handleInput} onComplete={handleComplete}>
                        <PinInputField/>
                        <PinInputField/>
                        <PinInputField/>
                        <PinInputField/>
                  </PinInput>
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
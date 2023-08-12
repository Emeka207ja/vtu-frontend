import { getBearToken,initiateTransfer,idetail } from "./service";
import { useState, useEffect } from "react";
import {
    Box,
    Spinner,
    Button,
    FormControl,
    Input,
    FormLabel,
    Textarea,
    HStack,
    Center,
    ModalContent,Modal,ModalBody,ModalHeader,ModalFooter,useDisclosure,ModalOverlay,ModalCloseButton
} from "@chakra-ui/react";
import { genReqId } from "@/Components/History/util.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "../service";
import { iProfile } from "@/redux/interface/profileInterface";
import { getProfileAction } from "@/redux/actions/getProfile.action";


export const Monify: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [formState, setFormState] = useState<{ loading: boolean, success: boolean }>({ loading: false, success: false })
    // const [userDetail,setUser] = useState<{name:string,email:string}>({name:"",email:""})
    const [errorMessage, setErrmsg] = useState<string | null>()
    const [token, setToken] = useState<string | null>()
    const [url, setUrl] = useState<string | null>()
    const [userDetail,setUser] = useState<{name:string,email:string}>({name:"",email:""})
    const [formdata, setFormdata] = useState<{ amount: string, desc: string }>({ amount: "", desc: "" })
    // const [token, setToken] = useState<string | null>()

    const dispatch = useAppDispatch()
    const { accessToken } = useAppSelector(state => state.loginAuth)
    
    const inputHandler = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setFormdata(prev => ({
            ...prev,[target.name]:target.value
        }))
    }


    const profileHandler = async () => {
        if (!accessToken) {
            setErrmsg("auth error,refresh page");
            return;
        }
        // console.log(accessToken)
        try {
            setFormState({ loading: true, success: false })
            setErrmsg("")
            const data:iProfile = await getProfile(accessToken)
            if (data) {
                const { email, name } = data
                if (email && name) {
                    setUser({name:name,email:email})
                }
            }
            setFormState({ loading: false, success: true})
            setErrmsg("")
            console.log(data)
        } catch (error:any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setFormState({ loading: false, success: false })
            setErrmsg(message)
        }
    }

    const bearerHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            setFormState({ loading: true, success: false });
            setErrmsg("")
            const data = await getBearToken()
           
            if (data) {
                const tokenx: string = data.responseBody?.accessToken;
                
                setToken(tokenx);
                if (tokenx) {
                    const idx = genReqId()
                    const detail:idetail = {
                        "amount": formdata.amount,
                        "customerName": userDetail.name,
                        "customerEmail":userDetail.email,
                        "paymentReference": idx,
                        "paymentDescription": formdata.desc,
                        "currencyCode": "NGN",
                        "contractCode":"793559574257",
                        "redirectUrl": "https://easy-buy-psi.vercel.app/wallet",
                        "paymentMethods":["CARD","ACCOUNT_TRANSFER"]
                    }
                    const val = await initiateTransfer(tokenx, detail)
                    const urlx: string = val?.responseBody?.checkoutUrl
                    setUrl(urlx)
                    // console.log(val)
                }
            }
           
            setFormState({ loading: false, success: true });
        } catch (error:any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({ loading: false, success: false });
        }
    }


    useEffect(() => {
       const profilex: string|null = typeof window !== 'undefined' ? localStorage.getItem('profile') : null
         if (profilex) {
             const user: iProfile = JSON.parse(profilex)
             const { name, email } = user
             if (name && email) {
                  setUser({name:name,email:email})
             }
            
            console.log("store",user.id)
        }
        
    },[])

    useEffect(() => {
        if (url) {
            onOpen()
        }
    },[url])
    // console.log(userDetail)
    return (
        <Box>
            
            {
                formState.loading && (
                    <Center mt={"1rem"}>
                         <Spinner/>
                    </Center>
                )
            }
           
            <form onSubmit={ bearerHandler}>
                <FormControl mt={"2rem"}>
                    <FormLabel>name</FormLabel>
                    <Input value={userDetail.name } readOnly/>
                </FormControl>

                <FormControl mt={"2rem"}>
                    <FormLabel>email</FormLabel>
                    <Input value={userDetail.email } readOnly />
                </FormControl>

                <FormControl mt={"2rem"}>
                    <FormLabel>amount</FormLabel>
                    <Input value={formdata.amount} name="amount" onChange={inputHandler} />
                </FormControl>

                <FormControl mt={"2rem"}>
                    <FormLabel>transaction description</FormLabel>
                    <Textarea value={formdata.desc} name="desc" onChange={inputHandler}/>
                </FormControl>

                <Box mt={"1rem"}>
                    <HStack>
                        <Button colorScheme="red">cancel</Button>
                        <Button colorScheme="blue" type="submit">generate</Button>
                    </HStack>
                </Box>
            </form>

            {
                url && url.length > 0 && (
                    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>proceed</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {
                                url && url.length > 0 && (
                                    <Button as={"a"} href={url}  colorScheme="red">click to proceed</Button>
                                )
                            }
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                            </Button>
                           
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                )
            }
        </Box>
    )
}
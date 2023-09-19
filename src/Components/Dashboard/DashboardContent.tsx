import {
    Box,
    Grid,
    GridItem, HStack,
    VStack, Flex,
    Heading,
    useColorMode,
    Card, CardBody,
    CardHeader,
    Text,
    Spinner,
    Center,
    Modal, ModalOverlay,
    ModalContent, ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from "@chakra-ui/react"
import { useState,useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {FaWallet,FaUserFriends} from "react-icons/fa"
import {ImConnection} from "react-icons/im"
import {BiPhoneCall} from "react-icons/bi"
import { BsLightbulb } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi"
import {SiGooglescholar} from "react-icons/si"
import {AiTwotoneInsurance} from "react-icons/ai"
import { useRouter, NextRouter } from "next/router"
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { getProfileAction } from "@/redux/actions/getProfile.action";
import { Spin } from "../Spinner";
import { getBearToken } from "../Virtual_Account/Monify/service";
import { genReqId } from "../History/util.service";
import { NavItem } from "./DashboardWrapper";
import { dashboardItem } from "./dashboardItem";
// import { getProfile } from "../Virtual_Account/service";
import { iProfile } from "@/redux/interface/profileInterface";
import { idetail, getReservedAccount,storeReservedAccount,userReservedAccount,getProfile } from "./service";
import { iMonnyfyAccount, iStoreMonnify } from "./iaccount";
import useQuerryString from "@/hooks/useQueryString";




export const DashboardContent = () => {
    const [Usertoken] = useQuerryString("token")
    const [formState, setFormState] = useState<{ loading: boolean, success: boolean }>({ loading: false, success: false })
    // const [userDetail,setUser] = useState<{name:string,email:string}>({name:"",email:""})
    const [errorMessage, setErrmsg] = useState<string | null>()
     const [userDetail,setUser] = useState<{name:string,email:string}>({name:"",email:""})
    const router: NextRouter = useRouter()
    const [userProfile, setUserProfile] = useState<iProfile | null>(null)
    const [isProfile,setIsProfile] = useState<boolean>(false)

    const [bankVal,setBankVal] = useState<{bankCode:string,bankName:string,accountNumber:string,accountName:string}|null>(null)

     const { isOpen, onOpen, onClose } = useDisclosure()


    const dispatch = useAppDispatch()
    const {accessToken } = useAppSelector(state => state.loginAuth)
    const {Profile:profile,pending } = useAppSelector(state => state.fetchProfile)
    const { colorMode, toggleColorMode } = useColorMode()

    const profileHandler = async () => {
        if (isProfile) {
            return
        }
        if (!accessToken) {
            return
        }
        const mainToken = Usertoken ? Usertoken : accessToken
       
        try {
            setFormState({ loading: true, success: false })
            setUserProfile(null)
            const user:iProfile = await getProfile(mainToken)
            
            setUserProfile(user)
            typeof window !== 'undefined' ? localStorage.setItem('profile',JSON.stringify(user)) : null
            await accountHandler(user)
            setFormState({ loading: false, success: true })
        } catch (error:any) {
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({ loading: false, success: false })
            console.log(message)
        }
    }

    const accountHandler = async (prof:iProfile) => {
          if (!accessToken) {
            return
        }
        
        if (userProfile && userProfile.isMonified) {
            console.log("monified")
            return
        }
        try {
            const mainToken = Usertoken? Usertoken:accessToken
            setFormState({loading:true,success:false})
            // const user: iProfile = await getProfile(mainToken)
            if (prof.isMonified) {
                setFormState({ loading: false, success: true })
                await getAccount()
                return
            }
            const val = await getBearToken()
            const token:string = val.responseBody?.accessToken
            const { name, email,username } = prof
            if (name && email && username) {
                const refex:string = genReqId()
                const detail: idetail = {
                    accountReference: refex,
                    accountName: name,
                    currencyCode: "NGN",
                    contractCode: "793559574257",
                    customerEmail: email,
                    customerName:  name,
                    preferredBanks:["50515"],
                    getAllAvailableBanks: false
                }

                const acct = await getReservedAccount(token,detail)
                const bankDetails:iMonnyfyAccount = acct.responseBody?.accounts[0]
                
                const {accountName,accountNumber,bankCode,bankName} = bankDetails
                const storePayload: iStoreMonnify = {
                    accountName,
                    accountNumber,
                    bankCode,
                    bankName,
                    accountReference:refex
                }
                const res = await storeReservedAccount(mainToken, storePayload)
                const data = await userReservedAccount(mainToken);
                setBankVal({
                    bankCode: data?.bankCode,
                    bankName: data?.bankName,
                    accountName: data?.accountName,
                    accountNumber:data?.accountNumber
                })
            }
              setFormState({loading:false,success:true})
        } catch (error:any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({loading:false,success:false})
        }
    }

    const getAccount = async () => {
         if (!accessToken) {
            return
        }
        const mainToken = Usertoken? Usertoken:accessToken
       
        try {
            setFormState({loading:true,success:false})
            const data = await userReservedAccount(mainToken);
            setBankVal({
                bankCode: data?.bankCode,
                bankName: data?.bankName,
                accountName: data?.accountName,
                accountNumber:data?.accountNumber
            })
          setFormState({loading:false,success:true})
        } catch (error:any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({ loading: false, success: false })
            console.log(message)
        }
    }
     
    useEffect(() => {
       
        if(!accessToken){
            router.push("/login")
        }
        
        if (Usertoken||accessToken) {
            profileHandler()
            // accountHandler()
        }
        // if (accessToken) {
        //     dispatch(getProfileAction(accessToken))
        // }

    }, [Usertoken,accessToken])
    
     useEffect(() => {
         const profilex: string|null = typeof window !== 'undefined' ? localStorage.getItem('profile') : null
         if (profilex) {
             const user: iProfile = JSON.parse(profilex)
             setIsProfile(true)
             setUserProfile(user)
             accountHandler(user)
       }
        
     }, [])
    
    useEffect(() => {
        if (userProfile && !userProfile.defaultPinChanged ) {
            onOpen()
        }
      
    },[userProfile?.defaultPinChanged])
    
    return (
        <Box>
            {
                formState.loading && (
                    <Center>
                        <Spinner/>
                    </Center>
                )
            }
            {
                userProfile ? (
                    <Center mb={"0.9rem"}>
                        <Text>welcome {userProfile.name }</Text>
                    </Center>
                ) : (
                        <Center>
                            <Text>dashboard</Text>
                        </Center>
                )
            }
            {/* PROFILE */}
            <Grid gridTemplateColumns={{base:"repeat(1,1fr)"}} gap={"1rem"}>
                <GridItem>
                    <Box  bg={colorMode==="light"?"red.100":"whiteAlpha.200"} borderRadius={"md"} padding={"1rem"} borderLeft={"3px solid red"}>
                         <HStack spacing={100} >
                            <Box>
                                <Box paddingLeft={"0.5rem"} fontSize={"0.9rem"}>Balance</Box>
                                <HStack>
                                    <Box paddingLeft={"0.5rem"} cursor={"pointer"}>&#8358;</Box>
                                    <Box cursor={"pointer"}>{ userProfile?userProfile.balance: 0}</Box>
                                </HStack>
                            </Box>

                            <Box>
                                <Box paddingLeft={"0.5rem"} fontSize={"0.9rem"}>Point</Box>
                                <HStack>
                                    <Box paddingLeft={"0.5rem"} cursor={"pointer"}>pt</Box>
                                    <Box cursor={"pointer"}>{ userProfile?userProfile.point: 0}</Box>
                                </HStack>
                            </Box>
                           
                        </HStack>
                   </Box>
                </GridItem>
                
                {/* BANK DETAILS */}
                <GridItem>
                    <Box  bg={colorMode==="light"?"red.100":"whiteAlpha.200"} borderRadius={"md"}  borderLeft={"3px solid red"}>
                        {
                            bankVal? (
                                <Card>
                                    <CardBody>
                                        {/* <Text>Bank Code : {bankVal.bankCode }</Text> */}
                                        <Text fontSize={"0.7rem"}>Bank Name : {bankVal.bankName ==="Moniepoint Microfinance Bank"?"Moniepoint MFB":bankVal.bankName }</Text>
                                        <Text fontSize={"0.7rem"}>Account Name : {`Allpoint-${bankVal.accountName }`}</Text>
                                        <Text fontSize={"0.7rem"}>Account Number : {bankVal.accountNumber }</Text>
                                    </CardBody>
                                </Card>
                            ) :  formState.loading || !bankVal && (
                                    <Center>
                                        <Spinner/>
                                    </Center>
                            )
                        }
                   </Box>
                </GridItem>
            </Grid>

            <Grid mt={"1rem"} templateColumns={{base:"repeat(2,1fr)", md:"repeat(3, 1fr)"}} gap={"0.7rem"}>

                {
                    dashboardItem.map(item => (
                        <Box
                            bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                            borderRadius={"md"}
                            key={item.name}
                        >
                            <NavItem key={item.name} icon={item.icon} url={item.url}>
                                {item.name}
                            </NavItem>
                        </Box>
                    ))
               }
            </Grid>

            {/* default pin change overlay */}

            {
                userProfile?.defaultPinChanged === false && (
                    <Modal
                        isOpen={isOpen}
                        onClose={userProfile?.defaultPinChanged ? onClose : () => { }}
                        closeOnOverlayClick={false}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader color={"red"} fontSize={"1em"}>action needed!!</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                                <Text fontSize={"0.8rem"}>please change your default password, to be able to transact with us</Text>
                                <Button colorScheme="blue" mt={"0.6rem"} as={"a"} href="/update_pin"> update</Button>
                        </ModalBody>

                    
                        </ModalContent>
                    </Modal>
                )
            }
        </Box>
    )
}
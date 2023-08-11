import {
    Box,
    Grid,
    GridItem, HStack,
    VStack, Flex,
    Heading,
    useColorMode,
    Card,CardBody,CardHeader,Text
} from "@chakra-ui/react"
import { useState,useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {FaWallet,FaUserFriends} from "react-icons/fa"
import {ImConnection} from "react-icons/im"
import {BiPhoneCall} from "react-icons/bi"
import {BsLightbulb} from "react-icons/bs"
import { FiMonitor } from "react-icons/fi"
import {SiGooglescholar} from "react-icons/si"
import {AiTwotoneInsurance} from "react-icons/ai"
import { useRouter, NextRouter } from "next/router"
import { useFetchProfile } from "@/hooks/useFetchProfile";
import { getProfileAction } from "@/redux/actions/getProfile.action";
import { Spin } from "../Spinner";
import { getBearToken } from "../Virtual_Account/Monify/service";
import { genReqId } from "../History/util.service";
import { getProfile } from "../Virtual_Account/service";
import { iProfile } from "@/redux/interface/profileInterface";
import { idetail, getReservedAccount,storeReservedAccount,userReservedAccount } from "./service";
import { iMonnyfyAccount,iStoreMonnify } from "./iaccount";



export const DashboardContent = () => {
    const [formState, setFormState] = useState<{ loading: boolean, success: boolean }>({ loading: false, success: false })
    // const [userDetail,setUser] = useState<{name:string,email:string}>({name:"",email:""})
    const [errorMessage, setErrmsg] = useState<string | null>()
     const [userDetail,setUser] = useState<{name:string,email:string}>({name:"",email:""})
    const router: NextRouter = useRouter()

    const [bankVal,setBankVal] = useState<{bankCode:string,bankName:string,accountNumber:string,accountName:string}|null>(null)


    const dispatch = useAppDispatch()
    const {accessToken } = useAppSelector(state => state.loginAuth)
    const {Profile:profile,pending } = useAppSelector(state => state.fetchProfile)
    const { colorMode, toggleColorMode } = useColorMode()


    const accountHandler = async () => {
        if (!accessToken) {
            setErrmsg("auth error,please refresh");
            return;
        }

        if(profile.isMonified){
            return
        }
        
        try {
            const user: iProfile = await getProfile(accessToken)
                if(user.isMonified){
                return
            }
            const val = await getBearToken()
            const token:string = val.responseBody?.accessToken
            const { name, email,username } = user
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
                const res = await storeReservedAccount(accessToken, storePayload)
            }
            
        } catch (error:any) {
            console.log(error)
        }
    }

    const getAccount = async () => {
        if (!accessToken) {
            setErrmsg("auth error,please refresh");
            return;
        }
        try {
            const data = await userReservedAccount(accessToken);
            setBankVal({
                bankCode: data?.bankCode,
                bankName: data?.bankName,
                accountName: data?.accountName,
                accountNumber:data?.accountNumber
            })
          
        } catch (error:any) {
            console.log(error)
        }
    }
      console.log("acct",bankVal)
    useEffect(() => {
        accountHandler()
        if(!accessToken){
            router.push("/login")
        }
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
        getAccount()
    },[accessToken])
    return (
        <Box>
            <Heading fontSize={"1.4rem"} mb={"1rem"} textAlign={"center"}>{pending?(<Spin/>): profile? profile.username:"Dashboard"}</Heading>
            <Grid gridTemplateColumns={{base:"repeat(1,1fr)"}} gap={"2rem"}>
                <GridItem>
                    <Box  bg={colorMode==="light"?"red.100":"whiteAlpha.200"} borderRadius={"md"} padding={"1rem"} borderLeft={"3px solid red"}>
                         <HStack spacing={100} >
                            <Box>
                                <Box paddingLeft={"0.5rem"} fontSize={"0.9rem"}>Balance</Box>
                                <HStack>
                                    <Box paddingLeft={"0.5rem"} cursor={"pointer"}>&#8358;</Box>
                                    <Box cursor={"pointer"}>{ profile?profile.balance: 0}</Box>
                                </HStack>
                            </Box>

                            <Box>
                                <Box paddingLeft={"0.5rem"} fontSize={"0.9rem"}>Point</Box>
                                <HStack>
                                    <Box paddingLeft={"0.5rem"} cursor={"pointer"}>pt</Box>
                                    <Box cursor={"pointer"}>{ profile?profile.point: 0}</Box>
                                </HStack>
                            </Box>
                           
                        </HStack>
                   </Box>
                </GridItem>
                <GridItem>
                    <Box  bg={colorMode==="light"?"red.100":"whiteAlpha.200"} borderRadius={"md"} padding={"1rem"} borderLeft={"3px solid red"}>
                        {
                            bankVal && (
                                <Card>
                                    <CardHeader>wallet</CardHeader>
                                    <CardBody>
                                        <Text>Bank Code : {bankVal.bankCode }</Text>
                                        <Text>Bank Name : {bankVal.bankName }</Text>
                                        <Text>Account Name : {`Allpoint-${bankVal.accountName }`}</Text>
                                        <Text>Account Number : {bankVal.accountNumber }</Text>
                                    </CardBody>
                                </Card>
                            )
                        }
                   </Box>
                </GridItem>
            </Grid>

            <Grid mt={"1rem"} templateColumns={{base:"repeat(2,1fr)", md:"repeat(3, 1fr)"}} gap={"0.7rem"}>
                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                        onClick={()=>router.push("/airtime")}
                    >
                        <HStack>
                            <BiPhoneCall/>
                            <Box cursor={"pointer"}>Airtime</Box>
                        </HStack>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/data")}
                    >
                        <HStack>
                            <ImConnection />
                            <Box cursor={"pointer"}>Data </Box>
                        </HStack>
                    </Box>
                </GridItem>

                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/datasub")}
                    >
                        <HStack>
                            <ImConnection />
                            <Box cursor={"pointer"}>Data ++</Box>
                        </HStack>
                    </Box>
                </GridItem>

                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/datatwo")}
                    >
                        <HStack>
                            <ImConnection />
                            <Box cursor={"pointer"}>Data option 3</Box>
                        </HStack>
                    </Box>
                </GridItem>

                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/wallet")}
                    >
                        <HStack>
                            <FaWallet />
                            <Box cursor={"pointer"}>Wallet</Box>
                        </HStack>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/electricity")}
                    >
                        <HStack>
                            <BsLightbulb />
                            <Box cursor={"pointer"}> Electricity</Box>
                        </HStack>
                    </Box>
                </GridItem>

                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/cable")}
                    >
                        <HStack>
                            <FiMonitor/>
                            <Box cursor={"pointer"}>Tv sub</Box>
                        </HStack>
                    </Box>
                </GridItem>
               
                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/peer")}
                    >
                        <HStack>
                            <FaUserFriends/>
                            <Box cursor={"pointer"}>P2p</Box>
                        </HStack>
                    </Box>
                </GridItem>

                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/smile")}
                    >
                        <HStack>
                             <BiPhoneCall/>
                            <Box cursor={"pointer"}>Smile</Box>
                        </HStack>
                    </Box>
                </GridItem>

                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/spectranet")}
                    >
                        <HStack>
                             <BiPhoneCall/>
                            <Box cursor={"pointer"}>Spectranet</Box>
                        </HStack>
                    </Box>
                </GridItem>
               

                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/insurance")}
                    >
                        <HStack>
                             <AiTwotoneInsurance/>
                            <Box cursor={"pointer"}>Insurance</Box>
                        </HStack>
                    </Box>
                </GridItem>
               
                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/internationalairtime")}
                    >
                        <HStack>
                             <BiPhoneCall/>
                            <Box cursor={"pointer"}>Int. Airtime</Box>
                        </HStack>
                    </Box>
                </GridItem>

                <GridItem>
                    <Box
                        bg={colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"}
                        borderRadius={"md"}
                        padding={"1rem"}
                         onClick={()=>router.push("/waec")}
                    >
                        <HStack>
                             <SiGooglescholar/>
                            <Box cursor={"pointer"}> Waec Pins</Box>
                        </HStack>
                    </Box>
                </GridItem>
               
            </Grid>
        </Box>
    )
}
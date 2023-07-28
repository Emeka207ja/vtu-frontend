import { Card, CardBody, CardHeader,Heading,Flex,Text,HStack,Box,CardFooter,Spinner,Center } from "@chakra-ui/react";
import { AiFillHome,AiFillEye,AiTwotoneEyeInvisible } from "react-icons/ai"
import { BsFillPeopleFill, BsFillCreditCardFill } from "react-icons/bs"
import {FaHistory } from "react-icons/fa"
import { GrServices } from "react-icons/gr"
import { getProfile } from "./service";
import { useEffect,useState } from "react"
import { useAppSelector } from "@/redux/hooks";
import { InitialProfile, iProfile } from "@/redux/interface/profileInterface";
import useQuerryString from "@/hooks/useQueryString";
import { useRouter, NextRouter } from "next/router";


export const Home: React.FC = () => {

    const router:NextRouter = useRouter()
    const { accessToken } = useAppSelector(state => state.loginAuth)

    const [token] = useQuerryString("token")

    const [profileState, setProfileState] = useState<{ loading: boolean, success: boolean, errMsg: string }>({ loading: false, success: false, errMsg: "" })
    const [profile, setProfile] = useState<iProfile>(InitialProfile)
    const [visible,setVisible] = useState<boolean>(false)

    const profileHandler = async () => {
        // if (!accessToken) {
        //     setProfileState({ loading: false, success: false, errMsg: "auth error, please refresh page" })
        //     return
        // }
        try {
            setProfileState({ loading: true, success: false, errMsg: "" })
            const data:iProfile = await getProfile(token)
            setProfile(data)
            console.log(data)
            setProfileState({loading:false,success:true,errMsg:""})
        } catch (error:any) {
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setProfileState({ loading: false, success: false, errMsg: message })
            console.log(error)
        }
    }
    useEffect(() => {
        if (token) {
            profileHandler()
        }
    },[token])
    return (
        <Card bg={"green.300"}>
            <CardHeader>
                <Heading fontSize={"1rem"}>welcome { profile.username}</Heading>
            </CardHeader>
            <CardBody>
                <Center>
                    {
                        profileState.loading ? (<Spinner />) : profileState.errMsg.length > 0 ? (<Text color={"red"}>{profileState.errMsg }</Text>):""
                    }
                </Center>
                <Box>
                    <Flex alignItems={"center"} justifyContent={"space-between"}>
                        <Box>
                            <HStack>
                                <Box fontSize={"0.8rem"}> Balance</Box>
                                <Box onClick={()=>setVisible(prev=>!prev)}> 
                                     {
                                        visible?  (<AiFillEye fontSize={"0.8rem"}/>):(<AiTwotoneEyeInvisible fontSize={"0.8rem"}/>)
                                    }
                                </Box>
                            </HStack>
                        </Box>

                        <Box>
                            <HStack>
                                <Box fontSize={"0.8rem"}> History</Box>
                                <Box onClick={()=>router.push("/history")}> 
                                  <FaHistory/>
                                </Box>
                            </HStack>
                        </Box>
                    </Flex>
                </Box>
                {
                    visible?(<Box>	&#8358; { profile.balance}</Box>):(<Box>xxxx</Box>)
                }
            </CardBody>
            <CardFooter>
                <Box>
                    <HStack spacing={"2rem"}>
                         <Box cursor={"pointer"}>
                            <Box position={"relative"} left={"0.9rem"} fontSize={"0.8rem"} >
                                <AiFillHome onClick={()=>router.push("/dashboard")}/>
                            </Box>
                            {/* <Box fontSize={"0.8rem"}>home</Box> */}
                        </Box>

                        <Box cursor={"pointer"} fontSize={"0.8rem"} >
                            <Box position={"relative"} left={"0.4rem"} >
                                <BsFillPeopleFill onClick={()=>router.push("/peer")}/>
                             </Box>
                            {/* <Box fontSize={"0.8rem"}>p2p</Box> */}
                        </Box>

                        <Box cursor={"pointer"} fontSize={"0.8rem"} >
                            <Box position={"relative"} left={"0.9rem"}>
                                <GrServices onClick={()=>router.push("/dashboard")}/>
                            </Box>
                            {/* <Box fontSize={"0.8rem"}>services</Box> */}
                        </Box>

                        <Box cursor={"pointer"} fontSize={"0.8rem"}>
                            <Box position={"relative"} left={"0.5rem"}>
                                <BsFillCreditCardFill/>
                            </Box>
                            {/* <Box fontSize={"0.8rem"}>card</Box> */}
                        </Box>
                    </HStack>
               </Box>
            </CardFooter>
        </Card>
    )
}
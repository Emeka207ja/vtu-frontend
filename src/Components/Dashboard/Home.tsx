import { Card, CardBody, CardHeader,Heading,Flex,Text,HStack,Box,CardFooter } from "@chakra-ui/react";
import { AiFillHome,AiFillEye,AiTwotoneEyeInvisible } from "react-icons/ai"
import { BsFillPeopleFill,BsFillCreditCardFill } from "react-icons/bs"
import { GrServices } from "react-icons/gr"
import { getProfile } from "./service";
import { useEffect,useState } from "react"
import { useAppSelector } from "@/redux/hooks";
import { InitialProfile, iProfile } from "@/redux/interface/profileInterface";


export const Home: React.FC = () => {
    const { accessToken } = useAppSelector(state => state.loginAuth)

    const [profileState, setProfileState] = useState<{ loading: boolean, success: boolean, errMsg: string }>({ loading: false, success: false, errMsg: "" })
    const [profile, setProfile] = useState<iProfile>(InitialProfile)
    const [visible,setVisible] = useState<boolean>(false)

    const profileHandler = async () => {
        if (!accessToken) {
            setProfileState({ loading: false, success: false, errMsg: "auth error, please refresh page" })
            return
        }
        try {
            setProfileState({ loading: true, success: false, errMsg: "" })
            const data:iProfile = await getProfile(accessToken)
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
        profileHandler()
    },[])
    return (
        <Card>
            <CardHeader>
                <Heading fontSize={"1rem"}>welcome { profile.username}</Heading>
            </CardHeader>
            <CardBody>
                <Box>
                    <Flex alignItems={"center"} justifyContent={"space-between"}>
                        <Box>
                            <HStack>
                                <Box> Balance</Box>
                                <Box onClick={()=>setVisible(prev=>!prev)}> 
                                     {
                                        visible? (<AiTwotoneEyeInvisible/>):(<AiFillEye/>)
                                    }
                                </Box>
                            </HStack>
                        </Box>

                        <Box>
                            <HStack>
                                <Box> History</Box>
                                <Box> 
                                   icon
                                </Box>
                            </HStack>
                        </Box>
                    </Flex>
                </Box>
                <Box>	&#8358; { profile.balance}</Box>
            </CardBody>
            <CardFooter>
                <Box>
                    <HStack spacing={"2rem"}>
                         <Box cursor={"pointer"}>
                            <Box position={"relative"} left={"0.9rem"}>
                                <AiFillHome/>
                            </Box>
                            <Box>Home</Box>
                        </Box>

                        <Box cursor={"pointer"}>
                            <Box position={"relative"} left={"0.4rem"}>
                                <BsFillPeopleFill/>
                             </Box>
                            <Box>p2p</Box>
                        </Box>

                        <Box cursor={"pointer"}>
                            <Box position={"relative"} left={"0.9rem"}>
                                <GrServices/>
                            </Box>
                            <Box>services</Box>
                        </Box>

                        <Box cursor={"pointer"}>
                            <Box position={"relative"} left={"0.5rem"}>
                                <BsFillCreditCardFill/>
                            </Box>
                            <Box>card</Box>
                        </Box>
                    </HStack>
               </Box>
            </CardFooter>
        </Card>
    )
}
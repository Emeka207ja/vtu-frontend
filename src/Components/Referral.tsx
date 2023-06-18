import { Box, Card, CardBody, Button, Grid, GridItem, HStack, useColorMode, Text, CardFooter } from "@chakra-ui/react"
import {useState,useEffect} from "react"
import axios from "axios"
import { useAppSelector,useAppDispatch } from "@/redux/hooks"
import { getReferral } from "@/api-folder/auth"
import { claimRefApi} from "@/api-folder/profile"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Referral = () => {
   
    const { colorMode, toggleColorMode } = useColorMode()
    const [loading,setLoading] = useState<boolean>(false)
    const [checkingValidity,setChecking] = useState<boolean>(false)
    const [valid,setValid] = useState<boolean>(false)
    const [refLink, setReflink] = useState<string | null>(null)
    const [success,setSuccess] = useState<boolean>(false)

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile } = useAppSelector(state => state.fetchProfile)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
       }
    },[])

    const generateReferral = async () => {
        const { username } = Profile
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken?.slice(1,-1)}`
            }
        }
         try {
             setLoading(true)
             setReflink(null)
             const { data } = await axios.post(getReferral, { username }, config)
             setReflink(data)
             console.log(data)
             setLoading(false)
             setSuccess(true)
         } catch (error:any) {
             console.log(error)
             setLoading(false)
             setSuccess(false)
             setReflink(null)
             toast.error(error.message)
         }
    }
    
    const handleCopy = (ref: string) => {
        navigator.clipboard.writeText(ref)
        toast.success("ref link copied!")
    }

    const claimReferral = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken?.slice(1,-1)}`
            }
        }
        try {
            setChecking(true)
            setValid(false)
            const {data} = await axios.get(claimRefApi,config)
            console.log(data)
            setChecking(false)
            setValid(true)
        } catch (error:any) {
            console.log(error?.response?.data?.message)
            toast.error(error?.response?.data?.message)
            setChecking(false)
            setValid(false)
        }
    }
    return (
        
        <Box>
            <Grid templateColumns={{base:"repeat(1,1fr)", md:"repeat(2, 1fr)"}} gap={"0.7rem"}>
                <Box  bg={colorMode==="light"?"red.100":"whiteAlpha.200"} borderRadius={"md"} padding={"1rem"} borderLeft={"3px solid red"}>
                    <HStack spacing={"3rem"}>
                        <Box>
                            <Box>Total referral</Box>
                            <Box pos={"relative"} left={"2rem"}>{Profile?.TotalReferred }</Box>
                        </Box>
                        <Box>
                            <Box>Referral count</Box>
                            <Box pos={"relative"} left={"2rem"}>{Profile?.ReferralCount }</Box>
                       </Box>
                        
                    </HStack>
                    <Card>
                        <CardBody>
                           {
                            checkingValidity? (<Text>Checking validity...please wait</Text>):valid&&(<Text>Ref bonus converted to cash congrats!</Text>)
                           }
                        </CardBody>
                        <CardFooter>
                            <Button onClick={claimReferral}>Claim ref bonus</Button>
                        </CardFooter>
                    </Card>
                </Box>
                <Box  bg={colorMode==="light"?"red.100":"whiteAlpha.200"} borderRadius={"md"} padding={"1rem"} borderLeft={"3px solid red"}>
                    <Card>
                        <CardBody>

                            {
                                loading ? "generating link.... plz wait" : success && (<Text wordBreak={"break-all"} >{ refLink}</Text>)
                           }
                        </CardBody>
                        <CardFooter>
                            <HStack>
                                <Button onClick={generateReferral}>Generate link</Button>
                                {
                                    refLink&& (<Button onClick={()=>handleCopy(refLink)}>Copy link</Button>)
                                }
                            </HStack>
                        </CardFooter>
                    </Card>
                </Box>
            </Grid>
            <ToastContainer limit={1}/>
        </Box>
    )
}
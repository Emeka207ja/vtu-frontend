import { Box,Text,Card,CardBody,CardFooter,CardHeader,Spinner,Heading } from "@chakra-ui/react"
import { genVirtualAccount } from "./service"
import { useState, useEffect } from "react"
import { genReqId } from "../History/util.service"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"


export const VirtualAccount: React.FC = () => {

    const [actName,setAccname] = useState<string>("")
    const [accNum, setAccnum] = useState<string>("")
    const [fetched, setFetched] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [bank, setBank] = useState<string>("")
    
    const dispatch = useAppDispatch()

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const {Profile,pending,success} = useAppSelector(state=>state.fetchProfile)

    const genAccount = async () => {
        const id = Date.now() + ""
       
        try {
            // if (Profile.name) {
            //    setName(Profile.name)
            // }
            setLoading(true)
            setFetched(false)
            const data = await genVirtualAccount(id, Profile?.name!);
            if (data) {
                setAccname(data.data?.account_name)
                setAccnum(data.data?.account_number)
                setBank(data.data?.bank_name)
                console.log(data.data?.account_name)
                setLoading(false)
                setFetched(true)
            }
            console.log(data)
            
        } catch (error: any) {
            console.log(error)
            setLoading(false)
            setFetched(false)
            
        }
    }
    useEffect(() => {
        if (Profile?.id) {
            genAccount()
      }
        
    }, [Profile?.id])
    
    useEffect(() => {
        if (accessToken) {
           dispatch(getProfileAction(accessToken))
       }

    },[accessToken])
    return (
        <Box mt={"2rem"}>
           
            <Card>
                <CardHeader>
                    <Heading fontSize={"1.1rem"}>
                        {
                            pending||loading ? (<Spinner/>):"Account details"
                        }
                    </Heading>
                </CardHeader>
                {
                    success && fetched && (
                        <CardBody>
                            <Box mb={"0.9rem"}>
                                 <Text>Make transfer to the account details below and your account will be automatically credited with the amount</Text>
                                 <Text fontSize={"1rem"} color={"red.300"}>PS :  you will be chareged 50 naira for every amount transfered</Text>
                          </Box>
                            <Text>Account name: { actName}</Text>
                            <Text>Account number: { accNum}</Text>
                            <Text>Bank: { bank}</Text>
                        </CardBody>
                    )
                }
            </Card>
        </Box>
    )
}
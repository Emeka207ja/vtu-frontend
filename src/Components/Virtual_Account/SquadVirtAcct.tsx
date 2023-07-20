import { Box,Text,Card,CardBody,CardFooter,CardHeader,Spinner,Heading } from "@chakra-ui/react"
import { getSquadAuth,squadAcct } from "./service"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { isquad } from "./service"

interface iAuth{
    acctnum: string;
    bvn: string;
    secret_key: string;
}


export const SquadVirtAcct: React.FC = () => {

    const [actName,setAccname] = useState<string>("")
    const [accNum, setAccnum] = useState<string>("")
    const [fetched, setFetched] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [bank, setBank] = useState<string>("")

    const [authDetails, setAuthDetails] = useState<iAuth>({ acctnum: "", bvn: "", secret_key: "" })
    
    const [acctDetails, setAccDetails] = useState<
        {
            first_name: string,
            last_name: string,
            beneficiary_account: string
        }
    >({ first_name: "", last_name: "", beneficiary_account: "" })
    
    const dispatch = useAppDispatch()

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile, pending, success } = useAppSelector(state => state.fetchProfile)
    

    const getAuth = async () => {
        try {
            const data: iAuth = await getSquadAuth()
            if (data) {
                setAuthDetails(data)
            }
            console.log(data)
        } catch (error:any) {
            console.log(error)
        }
    }

    const genAccount = async () => {
        const { secret_key } = authDetails
        if (!secret_key) {
            toast.error("auth error please reload page")
            return
        }
        
        const business_name  =`allpointvtu/${ Profile?.name!}`
        const customer_identifier = Date.now() + ""
        const mobile_num = "08137663855"
        const bvn = authDetails.bvn
        const beneficiary_account = authDetails.acctnum

        const val: isquad = {
            customer_identifier,
            business_name,
            mobile_num,
            bvn,
            beneficiary_account
        }

       
        try {
           
            setLoading(true)
            setFetched(false)
            const data = await squadAcct(secret_key, val);
            if (data) {
                const { first_name, last_name, beneficiary_account } = data.data
                setAccDetails({first_name,last_name,beneficiary_account})
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
         getAuth()
        if (accessToken) {
           dispatch(getProfileAction(accessToken))
       }

    }, [accessToken])
    
   
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
                                 <Text fontSize={"1rem"} color={"blue.300"}>PS :  you will not be charged any fee for this endpoint</Text>
                          </Box>
                            <Text>Account name: {acctDetails.first_name} </Text>
                            <Text>Account number: { acctDetails.beneficiary_account}</Text>
                            <Text>Bank: GT Bank</Text>
                        </CardBody>
                    )
                }
            </Card>
            <ToastContainer limit={1}/>
        </Box>
    )
}
import {
    Box, Text,
    Card, CardBody,
    CardFooter, CardHeader,
    Spinner, Heading, Input,
    FormLabel, FormControl,
    HStack,Button
} from "@chakra-ui/react"
import { genVirtualAccount,getProfile,acountHandler,storeRefId } from "./service"
import { useState, useEffect } from "react"
import { genReqId } from "../History/util.service"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { iProfile } from "@/redux/interface/profileInterface"
import { iKora, koraData } from "./iKorapay"
import { format } from 'timeago.js';


export const VirtualAccount: React.FC = () => {

    const [actName,setAccname] = useState<string>("")
    const [accNum, setAccnum] = useState<string>("")
    const [formState, setFormState] = useState<{ loading: boolean, success: boolean }>({ loading: false, success: false })
    const [userDetail,setUser] = useState<{name:string,email:string}>({name:"",email:""})
    const [errorMessage, setErrmsg] = useState<string | null>()
    const [amount,setAmount] = useState<string>("")
    const [bankdetails, setBank] = useState<iKora | null>(null)
     const [isProfile,setIsProfile] = useState<boolean>(false)
    
    const dispatch = useAppDispatch()

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile, pending, success } = useAppSelector(state => state.fetchProfile)


    const handleAmountInput = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setAmount(target.value);
    }

    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!accessToken) {
            setErrmsg("auth error,please refresh");
            return
        }
        const id: string = genReqId()
        const Amount = parseFloat(amount)
        try {
            setFormState({ loading: true, success: false })
            setBank(null)
            setErrmsg("")
            const data = await acountHandler(Amount, userDetail, id)
            const idx = await storeRefId(id, accessToken)
            if (data) {
                const vals: iKora = data.data?.bank_account;
                setBank(vals)
            }
            
            console.log(idx)
            setFormState({ loading: false, success: true })
            // console.log(data)
        } catch (error:any) {
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setFormState({ loading: false, success: false })
            setErrmsg(message)
            setBank(null)
            console.log(error)
        }
    }
    
    const profileHandler = async () => {
        if (isProfile) {
            return
        }
        if (!accessToken) {
            setErrmsg("auth error,refresh page");
            return;
        }
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

    useEffect(() => {
       const profilex: string|null = typeof window !== 'undefined' ? localStorage.getItem('profile') : null
        if (profilex) {
            const user: iProfile = JSON.parse(profilex)
            setIsProfile(true)
            setUser({name:user.name!,email:user.email!})
            console.log("store",user.id)
        }
        
    },[])

    // useEffect(() => {
    //     if (accessToken) {
    //       profileHandler()
    //  }

    // },[accessToken])
    return (
        <Box mt={"2rem"}>
            <Heading textAlign={"center"} fontSize={"1rem"}>payment account generation</Heading>
            {
                formState.loading && (
                    <Heading textAlign={"center"}>
                        <Spinner />
                    </Heading>
                )
            }

            {
                bankdetails && <Text color={"green"} textAlign={"center"}>generated! please scroll down.</Text>
            }
            {
               errorMessage && errorMessage.length > 0 && <Text textAlign={"center"} color={"red"}>{ errorMessage}</Text>
            }

            <form onSubmit={handleSubmit}>
                <FormControl  mt={"2rem"}>
                    <FormLabel>name</FormLabel>
                    <Input value={userDetail.name} readOnly/>
                </FormControl>

                <FormControl  mt={"2rem"}>
                    <FormLabel>email</FormLabel>
                    <Input value={userDetail.email} readOnly type="email"/>
                </FormControl>

                <FormControl  mt={"2rem"}>
                    <FormLabel>amount</FormLabel>
                    <Input value={amount} onChange={handleAmountInput}  />
                </FormControl>

                <Box mt={"2rem"}>
                    <HStack>
                        <Button colorScheme="red">cancel</Button>
                        <Button colorScheme="blue" type="submit" isDisabled={formState.loading}>proceed</Button>
                    </HStack>
                </Box>
            </form>
            {
                bankdetails && (
                    <Card  mt={"2rem"}>
                        <CardHeader>
                            <Heading  fontSize={"1rem"}>virtual account details</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text>Account name : { bankdetails.account_name}</Text>
                            <Text>Account number : { bankdetails.account_number}</Text>
                            <Text>Bank name : { bankdetails.bank_name}</Text>
                            <Text>Bank code : { bankdetails.bank_code}</Text>
                            <Text>expires  : { format(bankdetails.expiry_date_in_utc)}</Text>
                        </CardBody>
                    </Card>
                )
          }
        </Box>
    )
}
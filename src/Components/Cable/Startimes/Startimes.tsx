import { Box, Grid, Heading, FormControl, FormLabel, Input, Button, HStack, Select,Text,Spinner } from "@chakra-ui/react"
import { getDataVars } from "@/Components/Data/service"
import { useState, useEffect } from "react"
import { getHeaders } from "@/Components/Airtime/service"
import { verifySmartCard } from "../Dstv/service"
import { iVar } from "@/Components/Data/iProfvider"
import { iHolder } from "../Dstv/icardHolder"
import { NextRouter, useRouter } from "next/router"
import { iStartimes } from "./istartimes"

export const Startimes:React.FC = () => {

    const router:NextRouter = useRouter()

    const [vars, setVars] = useState<iVar[] | []>([])
    
    const [authData, setAuthData] = useState<{ api_key: string, secret_key: string }>({ api_key: "", secret_key: "" })
    
    const [card, setCard] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    
    const [holder, setHolder] = useState<iStartimes | null>(null)
     const [failed,setFailed] = useState<string|null>(null)
    
    const [formdata, setForm] = useState<{ varCode: string, phone: string }>({ varCode: "nova", phone: "" })
    
    const [amt,setAmt] = useState<string>("410.00")
    
    const handleCardChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setCard(target.value)
    }

    const handleInput = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setForm(prev => ({
            ...prev,[target.name]:target.value
        }))
    }

    const confirmCard = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setFailed(null)
            setHolder(null)
            const datax = await verifySmartCard(card, authData, "startimes");
            if (datax) {
                const val:iStartimes = datax.content;
                setHolder(val)
                setLoading(false)
                setFailed(null)
                 if (val.error) {
                    setFailed(val.error)
                    setHolder(null)
                }
            }
            
        } catch (error:any) {
            const message:string = (error.response && error.response.data && error.response.data.message)||error.message
            console.log(message)
            setHolder(null)
            setLoading(false)
        }
    }


    const handleDstvVars = async () => {
        try {
            const data = await getDataVars("startimes")
            if(data){
                const varation = data.content?.varations
                setVars(varation)
            }
           
        }catch(error:any){
            const message:string = (error.response && error.response.data && error.response.data.message)||error.message
            console.log(message)
        }
    }

    const authHeaders = async () => {
        try {
            const data = await getHeaders()
            
            if(data){
                setAuthData(data)
            }
           
        } catch (error:any) {
            const message:string = (error.response && error.response.data && error.response.data.message)||error.message
            console.log(message)
        }
    }

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const {varCode,phone} = formdata
        router.push(`/cable/confirmstartimes?varcode=${varCode}&phone=${phone}&biller=${card}&amt=${amt}&sId=startimes`)
    }

    useEffect(() => {
        handleDstvVars()
        authHeaders()
    }, [])

    useEffect(() => {
        if (vars.length > 0) {
            const selected: iVar[] = vars.filter(item => item.variation_code === formdata.varCode)
            console.log(selected)
            if (selected) {
                const amount = selected[0].variation_amount
                setAmt(amount)
           }
        }
    }, [formdata.varCode])
   
    return (
        <Box  mt={"3rem"}>
            <Heading fontSize={"1.2rem"} textAlign={"center"}>Startimes TV subscription</Heading>
            
            <Box mt={"1rem"} mb={"1rem"}>
                {
                    loading && (<Box textAlign={"center"}>
                        <Spinner/>
                    </Box>)
                }
                <form onSubmit={confirmCard}>
                    <Grid templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }} gap={"1rem"}>
                        
                        <FormControl>
                            <FormLabel>smartcard</FormLabel>
                            <Input value={card} onChange={handleCardChange} isRequired/>
                        </FormControl>

                        <Box mt={{base:"1rem", md:"2rem"}}>
                            <Button colorScheme="blue" type="submit">verify</Button>
                        </Box>

                    </Grid>
                    {
                        holder && (<Box mt={"1rem"} fontSize={"0.9rem"}>
                            <Text>name: {holder.Customer_Name }</Text>
                            <Text>customer number : {holder.Smartcard_Number}</Text>
                            <Text>balance : {holder.Balance}</Text>
                            {/* <Text>renewal amount: {holder.Renewal_Amount }</Text> */}
                            {/* <Text>due data: {holder.DUE_DATE }</Text> */}
                            {/* <Text>status: {holder.Status }</Text> */}
                        </Box>)
                    }
                     {
                        failed && failed.length>0? (<Text color={"red.600"}>{ failed}</Text>): ""
                    }
               </form>
            </Box>

            <Box>
                <form onSubmit={submitHandler}>
                    <Grid gap={"2rem"}>

                        <FormControl>
                            <FormLabel>package</FormLabel>
                            <Select value={formdata.varCode} name="varCode" onChange={handleInput} onClick={handleInput} isRequired>
                                {
                                    vars.length > 0 && vars.map(item => (<option value={item.variation_code} key={item.name}>{ item.name}</option>))
                                }
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>amount</FormLabel>
                            <Input value={amt} readOnly/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>phone</FormLabel>
                           <Input value={formdata.phone} name="phone" onChange={handleInput} isRequired/>
                        </FormControl>

                    </Grid>
                    <HStack mt={"1rem"}>

                        <Button colorScheme="red" onClick={()=>router.push("/dashboard")}>cancel</Button>
                        <Button colorScheme="blue" type="submit" isDisabled={failed? failed.length>0: false}>proceed</Button>

                    </HStack>
                </form>
            </Box>
        </Box>
    )
}
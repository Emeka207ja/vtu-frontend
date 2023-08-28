import { Box, Grid, Heading, FormControl, FormLabel, Input, Button, HStack, Select,Text,Spinner } from "@chakra-ui/react"
import { getDataVars } from "@/Components/Data/service"
import { useState, useEffect } from "react"
import { getHeaders } from "@/Components/Airtime/service"
import { verifySmartCard } from  "../Dstv/service"
import { iVar } from "@/Components/Data/iProfvider"
import { iHolder } from "../Dstv/icardHolder"
import { NextRouter,useRouter } from "next/router"

export const ShowMax:React.FC = () => {

    const router:NextRouter = useRouter()

    const [vars, setVars] = useState<iVar[] | []>([])
    
    const [authData, setAuthData] = useState<{ api_key: string, secret_key: string }>({ api_key: "", secret_key: "" })
    
    const [card, setCard] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    
    const [holder, setHolder] = useState<iHolder | null>(null)
     const [failed,setFailed] = useState<string|null>(null)
    
    const [formdata, setForm] = useState<{ varCode: string, phone: string }>({ varCode: "full", phone: "" })
    
    const [amt,setAmt] = useState<string>("2900.00")

    const handleInput = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setForm(prev => ({
            ...prev,[target.name]:target.value
        }))
    }

    const handleDstvVars = async () => {
        try {
            const data = await getDataVars("showmax")
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
        router.push(`/cable/confirmshowmax?varcode=${varCode}&phone=${phone}&amt=${amt}&sId=showmax`)
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
            <Heading fontSize={"1.2rem"} textAlign={"center"}>Showmax TV Subscription</Heading>
            
            <Box mt={"2rem"}>
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
                            <FormLabel>phone number to your showmax</FormLabel>
                           <Input value={formdata.phone} name="phone" onChange={handleInput} isRequired/>
                        </FormControl>

                    </Grid>
                    <HStack mt={"1rem"}>

                        <Button colorScheme="red" onClick={()=>router.push("/dashboard")}>cancel</Button>
                        <Button colorScheme="blue" type="submit">proceed</Button>

                    </HStack>
                </form>
            </Box>
        </Box>
    )
}
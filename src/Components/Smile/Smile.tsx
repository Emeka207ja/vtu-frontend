import { Box, Grid, GridItem, Button, FormControl, FormLabel, Input, Select, HStack,Heading,Spinner,FormHelperText } from "@chakra-ui/react"
import { getVariationCode } from "./service"
import { useState, useEffect } from "react"
import { iVar } from "./variation.interface"
import { verifySmile } from "./service"
import { getHeaders } from "../Airtime/service"


export const Smile: React.FC = () => {

    const [loading,setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const [Amount,setAmount] = useState<string>("")
    
    const [data, setData] = useState({  variation_code: "516", phone: "", })
    const [billersCode,setBiller] = useState("")
    const [vars, setVars] = useState<iVar[] | []>([])

    const [idx, setId] = useState<string>("");
    const[validating,setValidating] = useState<boolean>(false)
    const [valid, setValid] = useState<boolean>(false)
    
    const [api_key,setApikey] = useState<string>("")
    const [secret_key, setSecret] = useState<string>("")
    const [name,setName] = useState<string>("")
    

    const handleInputs = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setData(prev => ({
            ...prev, [target.name]:target.value
        }))
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(data)
    }

     const handleAmount = (e:React.SyntheticEvent)=>{
        const target = e.target as HTMLInputElement;
        setAmount(target.value)
    }
    const variationCode = async () => {
        try {
            const data = await getVariationCode()
            if (data) {
                const varation = data.content?.varations
                setVars(varation)
            }
            // console.log(data?.content.varations)
        } catch (error:any) {
            console.log(error)
        }
    }

    const Headers = async () => {
        try {
            const data = await getHeaders()
            if (data) {
                setApikey(data.api_key)
                setSecret(data.secret_key)
           }
            console.log(data)
        } catch (error:any) {
            console.log(error)
        }
    }

    const smileHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        try {
            setValidating(true)
            setValid(false)
            const data = await verifySmile(idx, "smile-direct", api_key, secret_key)
            if (data) {
                const id = data.content?.AccountList?.Account[0].AccountId
                console.log("id",id)
                setName(data.content?.Customer_Name)
                setBiller(id)
            }
            console.log(data)
             setValidating(false)
            setValid(true)
        } catch (error:any) {
            console.log(error)
            setValidating(false)
            setValid(false)
            setBiller(" ")
        }
    }
    const handleSmileId = (e:React.SyntheticEvent)=>{
        const target = e.target as HTMLInputElement;
        setId(target.value)
    }

    useEffect(() => {
        variationCode()
        Headers()
    }, [])
    useEffect(() => {
        if (vars.length > 0) {
            const val = vars.filter(el => el.variation_code === data.variation_code)
            // setAmout(val.variation_amount)
            if (val) {
                // console.log(val[0].variation_amount)
                setAmount(val[0].variation_amount)
           }
        }
    }, [data.variation_code])
    console.log(data.variation_code)
    return (
        <Box>
            
            <Box mb={"3rem"}>
                <form onSubmit={smileHandler}>
                    <Grid  templateColumns={{base:"repeat(1,1fr)", md:"repeat(2, 1fr)"}} gap={"1rem"}>
                        <Box>
                            <FormControl>
                                <FormLabel>
                                    {
                                        validating?(<Spinner/>):"Enter your Registered Email or Smile Account ID"
                                    }
                                </FormLabel>
                                <Input value={idx} onChange={handleSmileId} isRequired />
                                {
                                    valid && (<FormHelperText>{ name}</FormHelperText>)
                                }
                            </FormControl>
                        </Box>
                        <Box mt={{md:"2rem"}}>
                            <Button type="submit">Validate</Button>
                        </Box>
                    </Grid>
                </form>
           </Box>

            <form onSubmit={handleSubmit}>
                 <Grid  templateColumns={{base:"repeat(1,1fr)", md:"repeat(2, 1fr)"}} gap={"1rem"}>
                    <Box mb={"1rem"}>
                        <FormControl>
                            <FormLabel>Type</FormLabel>
                            <Select value={data.variation_code} onChange={handleInputs} name="variation_code">
                                {
                                    vars?.length > 0 && vars.map(item => (<option value={item.variation_code} key={item.name}>{item.name }</option>))
                               }
                           </Select>
                        </FormControl>
                    </Box>
                    <Box mb={"1rem"}>
                        <FormControl >
                            <FormLabel> Account ID</FormLabel>
                            <Input value={billersCode} readOnly />
                        </FormControl>
                    </Box>
                    <Box mb={"1rem"}>
                        <FormControl>
                            <FormLabel>Phone Number</FormLabel>
                            <Input value={data.phone} onChange={handleInputs} name="phone"/>
                        </FormControl>
                    </Box>
                    
                    <Box mb={"1rem"}>
                        <FormControl>
                            <FormLabel>Amount</FormLabel>
                            <Input value={Amount } isDisabled onChange={handleAmount}/>
                        </FormControl>
                    </Box>
                    <Box mb={"1rem"} mt={{md:"2rem"}}>
                        <HStack spacing={20}>
                            <Button colorScheme="blue" type="submit">submit</Button>
                            <Button colorScheme="red">cancel</Button>
                       </HStack>
                    </Box>
                   
                </Grid>
            </form>
        </Box>
    )
}
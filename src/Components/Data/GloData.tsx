import {Box,Grid,Input,FormControl,Select,FormLabel,Button,Heading,HStack} from "@chakra-ui/react"
import { useState,useEffect } from "react"
import { getDataVars } from "./service"
import { iVar } from "./iProfvider"
import { useRouter, NextRouter } from "next/router"
import { genReqId } from "../History/util.service"

export const GloData = () => {

    const router: NextRouter = useRouter()

    const [data,setData] = useState<{ varCode: string, biller: string }>({ varCode: "Glo Data N100 -  105MB - 2 day", biller: "" })
    const [amt, setAmt] = useState<string>("100.00")
    const [vars,setVars] = useState<iVar[]|[]>([])
    
    const handleInput = (e:React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        setData(prev => ({
            ...prev,[target.name]:target.value
        }))
    }

    const handleVars = async () => {
        try {
            const data = await getDataVars("glo-data")
            if (data) {
                const varatation = data.content?.varations
                setVars(varatation)
            }
            
        } catch (error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message
            console.log("dataVars error",message)
        }
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const { varCode, biller } = data
        const serviceID = "glo-data"
        router.push(`/datasub/confirm?varcode=${varCode}&biller=${biller}&sID=${serviceID}&amt=${amt}`)
    }

    const idHandler = () => {
        const id = genReqId()
        console.log(id)
    }

    useEffect(() => {
        handleVars()
    }, [])

    useEffect(() => {
        if (vars.length > 0) {
            const val = data.varCode
            const selected: iVar[] = vars.filter(item => item.variation_code === val)
            console.log(selected)
            if (selected) {
                const amount = selected[0]?.variation_amount
                console.log(amount)
                setAmt(amount)
            }
        }
    }, [data.varCode])
    
    return (
        <Box mt={"1rem"}>
            <Heading textAlign={"center"} fontSize={"1.1rem"} mb={"2rem"}>Glo data</Heading>
            <form onSubmit={handleSubmit}>
                <Grid gap={"2rem"} templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }} >
                    <FormControl>
                        <FormLabel fontSize={"0.9rem"}>phone number</FormLabel>
                        <Input name="biller" value={ data.biller} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"0.9rem"}>Type</FormLabel>
                        <Select name="varCode" value={ data.varCode} onChange={handleInput} fontSize={"0.9rem"}>
                            {
                                vars.length > 0 && vars.map(item => (<option value={item.variation_code} key={item.name}>{item.name }</option>))
                           }
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"0.9rem"}>Amount</FormLabel>
                        <Input value={amt} readOnly/>
                    </FormControl>
                </Grid>
                <Box mt={"1rem"}>
                    <HStack>
                        <Button colorScheme="red">cancel</Button>
                        <Button colorScheme="blue" type="submit">proceed</Button>
                    </HStack>
                </Box>
            </form>

            {/* <Button onClick={()=>idHandler()} colorScheme="green" mt={"0.5rem"}>gen request id</Button> */}
        </Box>
    )
}
import { Box, FormControl, FormLabel, Select, Input,Grid,Button,HStack } from "@chakra-ui/react"
import { fetchVars } from "./service"
import { useState, useEffect } from "react"
import { iVars } from "./iVars"
import { SpecLogo } from "./LogoSpec"
import { useRouter,NextRouter } from "next/router"


export const Spectranet: React.FC = () => {

    const router:NextRouter = useRouter()

    const [vars, setVars] = useState<iVars[] | []>([])
    const [data, setData] = useState({ varCode: "vt-1000", phone: "", qty: "",email:"" })
    const [amt, setAmt] = useState<string>("")
    
    const handleInput = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setData(prev => ({
            ...prev,[target.name]:target.value
        }))
    }

    

    const getVars = async () => {
        try {
            const data = await fetchVars()
            if (data) {
                const varations: iVars[] = data.content?.varations
                setVars(varations)
                 console.log(varations)
            }
            
        } catch (error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message;
            console.log(message)
        }
    }

    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault()
        const {phone,varCode,qty} = data
        router.push(`/spectranet/confirm?phone=${phone}&varCode=${varCode}&qty=${qty}&sID=spectranet&amt=${amt}`)
        // console.log(data)
    }

    useEffect(() => {
        getVars()
    }, [])

    useEffect(() => {
        if (vars.length > 0) {
            const selected = vars.filter(item => item.variation_code === data.varCode)
            const item: iVars = selected[0]
            const strPrice = item?.variation_amount + ""
            setAmt(strPrice)
            console.log(selected)
        }
    }, [data.varCode])
    console.log(data.varCode)
    return (
        <Box>
            <SpecLogo/>
            <form onSubmit={handleSubmit}>
                 <Grid templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }} gap={"1.6rem"} mb={"1rem"}>
                    <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Select name="varCode" value={data.varCode} onChange={handleInput} onClick={handleInput}>
                            {
                                vars?.length > 0 && vars.map(item => (<option value={item.variation_code} key={item.variation_code}>{ item.name}</option>))
                           }
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Phone Number</FormLabel>
                       <Input name="phone" value={data.phone} onChange={handleInput}/>
                    </FormControl>

                    {/* <FormControl>
                        <FormLabel>Email Address</FormLabel>
                       <Input name="email" value={data.email} onChange={handleInput}/>
                    </FormControl> */}

                    <FormControl>
                        <FormLabel>Amount</FormLabel>
                       <Input value={amt} readOnly/>
                    </FormControl>

                    <FormControl >
                        <FormLabel>Number of Pins</FormLabel>
                       <Input name="qty" value={data.qty} onChange={handleInput}/>
                    </FormControl>

                </Grid>
                <HStack>
                    <Button colorScheme="red" onClick={()=>router.push("/dashboard")}>cancel</Button>
                    <Button colorScheme="blue" type="submit">proceed</Button>
                </HStack>
           </form>
        </Box>
    )
}
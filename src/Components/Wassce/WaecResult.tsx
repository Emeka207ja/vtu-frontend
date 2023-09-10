import { Box,Input,Grid,Select,FormControl,FormLabel,HStack,Button } from "@chakra-ui/react";
import { LabelData } from "./Label";
import { iVar } from "../Data/iProfvider";
import { getDataVars } from "../Data/service";
import { useState, useEffect } from "react";
import { iformData, formData } from "./iwaec";
import { useRouter,NextRouter } from "next/router";


export const WaecResult: React.FC = () => {

    const router: NextRouter = useRouter()
    
    const [vars, setVars] = useState<iVar[] | []>([])
    const [formdata, setFormdata] = useState<iformData>(formData)
    const [price,setPrice] = useState<string>("")
    
    const handleInput = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setFormdata(prev => ({
            ...prev,[target.name]:target.value
        }))
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const { varCode, phone, quantity } = formdata
        router.push(`/waec/confirm?varcode=${varCode}&phone=${phone}&qty=${quantity}&sid=waec&amt=${price}`)
    }
    
    const varsHandler = async () => {
        try {
            const data = await getDataVars("waec")
            if (data) {
                const vararations: iVar[] = data.content?.varations
                setVars(vararations)
            }
        } catch (error:any) {
            console.log(error)
        }
    }

    

    useEffect(() => {
        varsHandler()
    }, [])
    
    useEffect(() => {
       
        if (vars.length > 0) {
            const varCode: string = formdata.varCode;
            const selected: iVar[] = vars.filter(item => item.variation_code === varCode)
            if (selected) {
                const amt: string = selected[0]?.variation_amount
                setPrice(amt)
            }
        }
       
    },[formdata.varCode])
    
    return (
        <Box mt={"2rem"}>
            <form onSubmit={handleSubmit}>
                <Grid gridTemplateColumns={{base:"repeat(1,1fr)",md:"repeat(2,1fr)"}} gap={"2rem"}>
                    <FormControl>
                        <FormLabel fontSize={"0.8rem"}>Exam Type</FormLabel>
                        <Select name="varCode" value={formdata.varCode} onChange={handleInput} onClick={handleInput}>
                            {
                                vars.length > 0 && vars.map(item => (<option value={item.variation_code} key={item.name}>{ item.name}</option>))
                            }
                       </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"0.8rem"}>Phone number</FormLabel>
                        <Input name="phone" value={formdata.phone} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"0.8rem"}>Amount</FormLabel>
                        <Input value={price} readOnly/>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"0.8rem"}>Quantity</FormLabel>
                        <Input name="quantity" value={formdata.quantity} onChange={handleInput}/>
                    </FormControl>
                </Grid>
                <Box mt={"1rem"}>
                    <HStack spacing={"1rem"}>
                        <Button colorScheme="red">cancel</Button>
                        <Button colorScheme="blue" type="submit">proceed</Button>
                    </HStack>
                </Box>
          </form>
        </Box>
    )
}
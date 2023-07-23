import { Box, Grid, FormControl, FormLabel, Select, Button, HStack,Input } from "@chakra-ui/react"
import { getDataVars } from "../../Data/service"
import { useState,useEffect } from "react"
import { iVar } from "../../Data/iProfvider"
import { icarInsureData, carInsuranceBioData } from "../iInsurance"
import { NextRouter, useRouter } from "next/router"
import { homeData } from "./iHome"
import { iHome } from "./iHome"

export const HomeInsurance: React.FC = () => {

    const router = useRouter()

    const [vars, setVars] = useState<iVar[] | []>([])
    const [formdata, setFormdata] = useState<iHome>(homeData)
    const [price,setPrice] = useState<string>("")
    
    const handleInput = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setFormdata(prev => ({
            ...prev, [target.name]:target.value
        }))
    }

    const insuranceVars = async () => {
        try {
            const data = await getDataVars("home-cover-insurance")
            
            if (data) {
                const varation: iVar[] = data.content?.varations
                setVars(varation)
               
            }

           
        } catch (error:any) {
            console.log(error)
        }
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
    }
    useEffect(() => {
        insuranceVars()
    }, [])
    useEffect(() => {
        if (vars.length > 0) {
            const selected: iVar[] = vars.filter(item => item.variation_code === formdata.varCode)
            if (selected) {
                const amount: string = selected[0].variation_amount
                setPrice(amount)

            }
        }
    },[formdata.varCode])
    return (
        <Box mt={"2rem"}>
            <form onSubmit={handleSubmit}>
                <Grid gridTemplateColumns={{base:"repeat(1,1fr)",md:"repeat(2,1fr)"}} gap={"2rem"}>
                    <FormControl>
                        <FormLabel>Insurance type</FormLabel>
                        <Select fontSize={"0.9rem"} name="varCode" value={formdata.varCode} onChange={handleInput}>
                            {
                                vars.length > 0 && vars.map(item => (<option value={item.variation_code} key={item.name}>{ item.name}</option>))
                            }
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel> Full name</FormLabel>
                        <Input fontSize={"0.9rem"} name="full_name" value={formdata.full_name} onChange={handleInput}/>
                    </FormControl>
                    
                   

                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input fontSize={"0.9rem"} name="address" value={formdata.address} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Type of building</FormLabel>
                        <Input fontSize={"0.9rem"} name="type_building" value={formdata.type_building} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>business_occupation</FormLabel>
                        <Input fontSize={"0.9rem"} name="business_occupation" value={formdata.business_occupation} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Date of Birth</FormLabel>
                        <Input fontSize={"0.9rem"} name="date_of_birth" value={formdata.date_of_birth} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Phone number </FormLabel>
                        <Input fontSize={"0.9rem"} name="phone" value={formdata.phone} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <Input value={ price}readOnly />
                    </FormControl>

                    <Box mt={{md: "2rem"} }>
                         <HStack>
                            <Button colorScheme="red">cancel</Button>
                            <Button colorScheme="blue" type="submit" isDisabled> proceed</Button>
                        </HStack>
                   </Box>
               </Grid>
           </form>
        </Box>
    )
}
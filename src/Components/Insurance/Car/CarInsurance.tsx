import { Box, Grid, FormControl, FormLabel, Select, Button, HStack,Input } from "@chakra-ui/react"
import { getDataVars } from "../../Data/service"
import { useState,useEffect } from "react"
import { iVar } from "../../Data/iProfvider"
import { icarInsureData, carInsuranceBioData } from "../iInsurance"
import { NextRouter,useRouter } from "next/router"

export const CarInsurance: React.FC = () => {

    const router = useRouter()

    const [vars, setVars] = useState<iVar[] | []>([])
    const [formdata, setFormdata] = useState<icarInsureData>(carInsuranceBioData)
    const [price,setPrice] = useState<string>("")
    
    const handleInput = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setFormdata(prev => ({
            ...prev, [target.name]:target.value
        }))
    }

    const insuranceVars = async () => {
        try {
            const data = await getDataVars("ui-insure")
            
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
        const {
            varCode,
            phone,
            Insured_Name,
            Engine_Number,
            Chasis_Number,
            Plate_Number,
            Vehicle_Make,
            Vehicle_Color,
            Vehicle_Model,
            Year_of_Make,
            Contact_Address
        } = formdata
        console.log(formdata)

        router.push(`/insurance/carconfirm?vcode=${varCode}
        &name=${Insured_Name}
        &engine=${Engine_Number}
        &chasis=${Chasis_Number}
        &plate=${Plate_Number}
        &make=${Vehicle_Make}
        &color=${Vehicle_Color}
        &model=${Vehicle_Model}
        &year=${Year_of_Make}
        &address=${Contact_Address}&price=${price}`)
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
                        <FormLabel>Insured name</FormLabel>
                        <Input fontSize={"0.9rem"} name="Insured_Name" value={formdata.Insured_Name} onChange={handleInput}/>
                    </FormControl>
                    
                    <FormControl>
                        <FormLabel>Engine Number</FormLabel>
                        <Input fontSize={"0.9rem"} name="Engine_Number" value={formdata.Engine_Number} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Chasis Number</FormLabel>
                        <Input fontSize={"0.9rem"} name="Chasis_Number" value={formdata.Chasis_Number} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Plate Number</FormLabel>
                        <Input fontSize={"0.9rem"} name="Plate_Number" value={formdata.Plate_Number} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Vehicle make</FormLabel>
                        <Input fontSize={"0.9rem"} name="Vehicle_Make" value={formdata.Vehicle_Make} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Vehicle model</FormLabel>
                        <Input fontSize={"0.9rem"} name="Vehicle_Model" value={formdata.Vehicle_Model} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Year of make</FormLabel>
                        <Input fontSize={"0.9rem"} name="Year_of_Make" value={formdata.Year_of_Make} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Registered address</FormLabel>
                        <Input fontSize={"0.9rem"} name="Contact_Address" value={formdata.Contact_Address} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Vehicle color</FormLabel>
                        <Input fontSize={"0.9rem"} name="Vehicle_Color" value={formdata.Vehicle_Color} onChange={handleInput}/>
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
                            <Button colorScheme="blue" type="submit"> proceed</Button>
                        </HStack>
                   </Box>
               </Grid>
           </form>
        </Box>
    )
}
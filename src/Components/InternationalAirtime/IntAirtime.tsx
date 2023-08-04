import { Box, Grid, FormControl, FormLabel, Input,Select } from "@chakra-ui/react"
import { Label } from "./Label"
import { getCountries,getOptions,getOperator } from "./service"
import { iCountry,idata,intData,ioption,ioperator } from "./iLabel"
import {useState,useEffect} from "react"


export const IntAirtime: React.FC = () => {

    const [countries, setCountries] = useState<iCountry[] | []>([])
    const [img,setImg] = useState<string>("")
    // const [selected, setSelected] = useState<string>("")
    const [formdata, setFormdata] = useState<idata>(intData)
    const [option, setOption] = useState<string>("GH")
    const [type, setType] = useState<string>("4")
    const [operator, setOperator] = useState<ioperator[]|[]>([])
    const [optionData, setOptionData] = useState<ioption[]|[]>([])
    
    
    const handleInput = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        setFormdata(prev => ({
           ...prev,[target.name]:target.value
       }))
    }
    
    const handleCountries = async () => {
        try {
            const data = await getCountries()
            if(data){
                const country: iCountry[] = data.content?.countries
                setCountries(country)
            }
        } catch (error:any) {
            console.log(error)
        }
    }
    const handleOptions = async (id: string) => {
         console.log(id)
        try {
            const data = await getOptions(id)
            if(data){
                const val: ioption[] = data.content
                setOptionData(val)
                // console.log(val)
            }
            // console.log(data)
            
        } catch (error:any) {
            console.log(error)
        }
    }
    const handleOperator = async (code:string,id: string) => {
         console.log(id)
        try {
            const data = await getOperator(code, id)
            if(data){
                const val: ioperator[] = data.content
                setOperator(val)
                console.log(val)
            }
            console.log(data)
            
        } catch (error:any) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleCountries()
        handleOptions(option)
        handleOperator(option,type)
    }, [option,type])

    useEffect(() => {
        if (countries.length > 0) {
            const country: iCountry[] = countries.filter(item => item.code === formdata.country)
            if (country) {
                const flag:string = country[0]?.flag
                setImg(flag)
                const code:string = country[0]?.code
                setOption(code)
            }
        }
    }, [formdata.country])

    useEffect(() => {
        if (optionData.length > 0) {
            const selected:ioption[] = optionData.filter(item => item.product_type_id === parseFloat(formdata.product_type))
             console.log(selected)
            if (selected) {
                const id: string = selected[0]?.product_type_id +""
                setType(id)
                console.log(id)
            }
        }
    }, [formdata.product_type])
    
    // console.log()
    
    
    return (
        <Box>
            <Label image={img} />
            <Box mt={"2rem"}>
                <form>
                    <Grid gridTemplateColumns={{base:"repeat(1,1fr)",md:"repeat(2,1fr)"}} gap={"1rem"}>
                        <FormControl>
                            <FormLabel>country</FormLabel>
                            <Select value={formdata.country} name="country" onChange={handleInput} onClick={handleInput}>
                                {
                                    countries.length > 0 && countries.map(item => (<option value={item.code} key={item.code}>{item.name }</option>))
                               }
                            </Select>
                        </FormControl>

                        <FormControl>
                            {
                                formdata.country.length > 0 && (
                                    <Box>
                                        <FormLabel>Product type</FormLabel>
                                        <Select value={formdata.product_type} name="product_type" onChange={handleInput} onClick={handleInput}>
                                            {
                                                optionData.length > 0 && optionData.map(item => (<option value={item.product_type_id} key={item.name}>{ item.name}</option>))
                                           }
                                        </Select>
                                    </Box>
                                )
                            }
                        </FormControl>

                        <FormControl>
                            {
                                formdata.country.length > 0 && formdata.product_type.length > 0 && (
                                    <Box>
                                        <FormLabel>Product type</FormLabel>
                                        <Select value={formdata.operator_id} name="operator_id" onChange={handleInput} onClick={handleInput}>
                                            {
                                                operator.length > 0 && operator.map(item => (<option value={item.operator_id} key={item.name}>{ item.name}</option>))
                                           }
                                        </Select>
                                    </Box>
                                )
                            }
                        </FormControl>
                    </Grid>
                </form>
           </Box>
        </Box>
    )
}
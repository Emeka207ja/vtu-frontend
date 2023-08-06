import {
    Box, Grid,
    FormControl, FormLabel,
    Input, Select, Spinner,
    Heading, Text, FormHelperText,
    InputGroup, InputLeftAddon,
    Button,HStack
} from "@chakra-ui/react"
import { Label } from "./Label"
import { getCountries,getOptions,getOperator,getOperatorType } from "./service"
import { iCountry,idata,intData,ioption,ioperator,ioperatorType } from "./iLabel"
import {useState,useEffect} from "react"


export const IntAirtime: React.FC = () => {

    const [countries, setCountries] = useState<iCountry[] | []>([])
    const [img,setImg] = useState<string>("")
    const [currencycode,setCurrencyCode] = useState<string>("")
    const [countrycode, setCountrycode] = useState<string>("")
    const [formdata, setFormdata] = useState<idata>(intData)
    const [option, setOption] = useState<string>("GH")
    const [type, setType] = useState<string>("4")
    const [operator, setOperator] = useState<ioperator[]|[]>([])
    const [optionData, setOptionData] = useState<ioption[]|[]>([])
    const [operatortypeData, setOperatorTypeData] = useState<ioperatorType[] | []>([])
    const [amount,setAmount] = useState<string>("")
    const [currency,setCurrency] = useState<string>("")
    const [rate,setRate] = useState<number>(1)
    const [isflexible, setIsflexible] = useState<boolean>(true)
    const [formState, setFormState] = useState<{ loading: boolean, success: boolean }>({ loading: false, success: false })
    const [errorMessage, setErrmsg] = useState<string | null>()
    const [minMax, setMinMax] = useState<{ min: string, max: string }>({ min: "", max: "" })
    const [check,setCheck] = useState<boolean>(false)
    
    
    const handleInput = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        setFormdata(prev => ({
           ...prev,[target.name]:target.value
       }))
    }
    const handleAmount = (e: React.SyntheticEvent) => { 
        const target = e.target as HTMLInputElement;
        setAmount(target.value);
    }
    

    const handleCountries = async () => {
        try {
            setErrmsg(null)
            setCheck(false)
            setFormState({loading:true,success:false})
            const data = await getCountries()
            
            if(data){
                const country: iCountry[] = data.content?.countries
                setCountries(country)
            }
            setFormState({ loading: false, success: true })
            console.log(data)
        } catch (error:any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({loading:false,success:false})
        }
    }


    const handleOptions = async (id: string) => {
         console.log(id)
        try {
            setErrmsg(null)
            setFormState({loading:true,success:false})
            const data = await getOptions(id)
            if(data){
                const val: ioption[] = data.content
                setOptionData(val)
                // console.log(val)
            }
            setFormState({loading:false,success:true})
            // console.log(data)
            
        } catch (error:any) {
            console.log(error)
        }
    }

    const handleOperatorType = async (id: string,typex:string) => {
        
        try {
            setErrmsg(null)
             setFormState({loading:true,success:false})
            const data = await getOperatorType(id, typex)
            if (data) {
                const varation: ioperatorType[] = data.content?.variations
                setOperatorTypeData(varation)
                const currCode: string = data.content?.currency 
                setCurrencyCode(currCode)
               
                // console.log(varation)
            }
            setFormState({loading:false,success:true})
            // console.log(data)
            
        } catch (error:any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({ loading: false, success: false })
        }
    }


    const handleOperator = async (code:string,id: string) => {
        try {
            setErrmsg(null)
            setFormState({loading:true,success:false})
            const data = await getOperator(code, id)
            if(data){
                const val: ioperator[] = data.content
                setOperator(val)
                // console.log(val)
            }
            // console.log(data)
            setFormState({loading:false,success:true})
            
        } catch (error:any) {
            console.log(error)
             
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
            setFormState({loading:false,success:false})
        }
    }

    useEffect(() => {
        handleCountries()
        handleOptions(option)
        handleOperator(option, type)
       
    }, [option, type])
    
    useEffect(() => {
        const id = formdata.operator_id.length > 0 ? formdata.operator_id : "1"
        const typex = formdata.product_type.length > 0 ? formdata.product_type : "1"
        console.log(id,typex)
        handleOperatorType(id,typex)
    },[formdata.operator_id,formdata.product_type])

    useEffect(() => {
        if (countries.length > 0) {
            const country: iCountry[] = countries.filter(item => item.code === formdata.country)
            if (country) {
                const flag: string = country[0]?.flag
                const countryCode: string = country[0]?.prefix
                const currencyCode:string = country[0]?.currency
                setCountrycode(countryCode)
                setCurrency(currencyCode)
                setImg(flag);
                const code:string = country[0]?.code
                setOption(code)
            }
        }
    }, [formdata.country])

    useEffect(() => {
        if (optionData.length > 0) {
            const selected:ioption[] = optionData.filter(item => item.product_type_id === parseFloat(formdata.product_type))
            //  console.log(selected)
            if (selected) {
                const id: string = selected[0]?.product_type_id +""
                setType(id)
                // console.log(id)
            }
        }
    }, [formdata.product_type])

    useEffect(() => {
        setCurrency("")
        setCheck(false)
        // setIsflexible(false)
        // console.log(name)
        if (operatortypeData.length > 0) {
            const selected = operatortypeData.filter(item => item.name === "Enter flexible amount")
            if (selected.length>0) {
                setIsflexible(true)
                const val = selected[0]?.name
                const minVal: string = selected[0]?.variation_amount_min +"";
                const maxVal: string = selected[0]?.variation_amount_max +"" ;
                setMinMax({ min: minVal, max: maxVal })
                setCheck(true)
                // setName(val)
            }

        }
        if (operatortypeData.length > 0) {
            const selected = operatortypeData.filter(item => item.variation_code === formdata.operator_type)
            console.log(selected)
             if (selected.length>0) {
              
               
                const flex = selected[0]?.name
                 
                if (flex !== "Enter flexible amount") {
                    const price = selected[0]?.variation_amount
                    const rate = selected[0]?.variation_rate
                    setAmount(price)
                    setRate(rate)
                    setIsflexible(false)
                    setCheck(false)
                } else {
                    setAmount("")
                    setCurrency("")
                    setIsflexible(true)
                }
            }
        }
    },[formdata.operator_type])
    
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(formdata)
        console.log(countrycode)

    }
    
    
    return (
        <Box>
            <Label image={img} />
            <Box mt={"2rem"}>
                {
                    formState.loading && (
                        <Heading textAlign={"center"}>
                            <Spinner/>
                        </Heading>
                    )
                }
                {
                    errorMessage && <Text textAlign={"center"} color={"red"}>{ errorMessage}</Text>
                }
                <form onSubmit={handleSubmit}>
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
                                        <FormLabel>operator</FormLabel>
                                        <Select value={formdata.operator_id} name="operator_id" onChange={handleInput} onClick={handleInput}>
                                            {
                                                operator.length > 0 && operator.map(item => (<option value={item.operator_id} key={item.name}>{ item.name}</option>))
                                           }
                                        </Select>
                                    </Box>
                                )
                            }
                        </FormControl>

                        <FormControl>
                            {
                                formdata.country.length > 0 && formdata.product_type.length > 0 &&formdata.operator_id.length > 0  && (
                                    <Box>
                                        <FormLabel>operator type</FormLabel>
                                        <Select value={formdata.operator_type} name="operator_type" onChange={handleInput} onClick={handleInput}>
                                            {
                                                operatortypeData.length > 0 && operatortypeData.map(item => (<option value={item.variation_code} key={item.name}>{ item.name}</option>))
                                           }
                                        </Select>
                                    </Box>
                                )
                            }
                        </FormControl>

                        <FormControl>
                            <FormLabel>Amount</FormLabel>
                            {
                                // check && (<Text> amount between {`${currencycode} `} </Text>)
                                check && (<Text> amount between {`${minMax.min} - ${minMax.max} ${currencycode}  `} </Text>)
                            }
                            <Input value={`${currency+ amount}`} onChange={handleAmount} isDisabled={!isflexible} />
                            {
                                !isflexible&&<Text> you are to pay &#8358; {( parseFloat(amount) * rate).toFixed(2)}</Text>
                            }
                        </FormControl>

                        <FormControl mt={{md: check?"2rem":""}}>
                              <FormLabel>phone number</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={`+${countrycode}`} />
                                <Input type='tel' placeholder='phone number' name="phone" value={ formdata.phone} onChange={handleInput} />
                            </InputGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel>email</FormLabel>
                            <Input  name="email" value={ formdata.email} onChange={handleInput}/>
                        </FormControl>
                       
                    </Grid>

                    <Box mt={"1rem"}>
                        <HStack>
                            <Button colorScheme="red">cancel</Button>
                            <Button colorScheme="blue" type="submit">proceed</Button>
                        </HStack>
                    </Box>
                   
                </form>
           </Box>
        </Box>
    )
}
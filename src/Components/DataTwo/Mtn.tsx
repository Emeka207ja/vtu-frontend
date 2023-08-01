import { Box, Grid, FormControl, FormLabel, Button, Select, Input, HStack,Spinner,Heading,Text } from "@chakra-ui/react"
import { getOptions } from "./service"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect, useState } from "react"
import { ioptions } from "./idataTwo"
import { useRouter,NextRouter } from "next/router"

export const MtnSME: React.FC = () => {

    const router:NextRouter = useRouter()

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const {Profile,pending,error} = useAppSelector(state=>state.fetchProfile)
    const dispatch = useAppDispatch()

    const [optionState, setOptionState] = useState<{ loading: boolean, success: boolean, err: string }>({ loading: false, success: false, err: "" })
    
    const [Options, setOptions] = useState<ioptions[] | []>([])
    
    const [formVal, setFormVal] = useState<{ plan_id: string, phone: string }>({ plan_id: "", phone: "" })
    const [price,setPrice] = useState<string>("")
    
    const inputHandler = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setFormVal(prev => ({
            ...prev,[target.name]:target.value
        }))
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const { plan_id, phone } = formVal
        router.push(`/datatwo/confirm?plan=${plan_id}&phone=${phone}&amt=${price}`)
    }



    const optionHandler = async () => {
        if (!accessToken) {
            console.log("stopped")
            setOptionState({loading:false,success:false,err:"error occurred please reload"})
            return
        }
        try {
            setOptionState({loading:true,success:false,err:""})
            const data:ioptions[] = await getOptions(accessToken, "MTN_SME")
            setOptions(data)
            setOptionState({loading:false,success:true,err:""})
            console.log(data)

        } catch (error: any) {
            console.log(error)
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message;
            setOptionState({loading:false,success:false,err:message})
        }
    }

    useEffect(() => {
         optionHandler()
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
           
        }
    }, [accessToken])
    useEffect(() => {
        if (Options.length > 0) {
            const selected: ioptions[] = Options.filter(item => item.plan_id === formVal.plan_id)
            if (selected) {
                const amt: string = selected[0]?.price + ""
                setPrice(amt)
            }
        }
    },[formVal.plan_id])
    return (
        <Box mt={"2rem"}>
            {
                pending&& (<Heading textAlign={"center"}></Heading>)
            }
            {
                optionState.loading?(<Heading textAlign={"center"}>
                    <Spinner/>
                </Heading>) : optionState.err.length>0 ? <Text textAlign={"center"}>{optionState.err }</Text>:""
            }
            <form onSubmit={handleSubmit}>
                <Grid gridTemplateColumns={{base:"repeat(1,1fr)",md:"repeat(2,1fr)"}} gap={"1rem"}>
                    <FormControl mb={"1rem"} >
                        <FormLabel>select plan</FormLabel>
                        <Select name="plan_id" value={formVal.plan_id} onChange={inputHandler}>
                            {
                                Options.length > 0 && Options.map(item => (<option value={ item.plan_id} key={item.name}>{ item.name}</option>))
                            }
                        </Select>
                    </FormControl>

                    <FormControl mb={"1rem"}>
                        <FormLabel>phone number</FormLabel>
                       <Input name="phone" value={formVal.phone} onChange={inputHandler}/>
                    </FormControl>

                    <FormControl >
                        <FormLabel>price</FormLabel>
                        <Input value={price} readOnly/>
                    </FormControl >

                    <Box mt={{md:"2rem"}}>
                        <HStack>
                            <Button colorScheme="red">cancel</Button>
                            <Button colorScheme="blue" type="submit">proceed</Button>
                        </HStack>
                  </Box>
                </Grid>
            </form>
        </Box>
    )
}
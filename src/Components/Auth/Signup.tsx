import { Box, Image, Text, Grid, GridItem, FormControl, FormLabel, Input, Button, Flex,Spinner,Center } from "@chakra-ui/react"
import { useState,useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signupAction } from "@/redux/actions/signup-action";
import { reset } from "@/redux/slices/signup-slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTimeout } from "timers/promises";


interface signupDetails{
    email: string;
    username: string;
    password: string;
    confirm_password:string
}


export const SignupComponent: React.FC = () => {
    const dispatch = useAppDispatch()
    const {userId,pending,success,isError } = useAppSelector(state=>state.signupAuth)

    const [value, setValue] = useState<signupDetails>({
        email: "",
        username: "",
        password: "",
        confirm_password: ""
    })
    const [err, setErr] = useState<any>(null)
    
    function handleInputChange(e: React.SyntheticEvent):void {
        let target =( e.target!) as HTMLInputElement
        setValue(prevState => ({ ...prevState, [target.name!]: target.value }))
    }

    function validate(password: string): boolean {
        let temp: boolean = true;
        if (password.length < 6) temp = false;
        else{
            temp = true
        }
        return temp;
    }

    function handleSubmit(e: React.SyntheticEvent): void{
        
        e.preventDefault()
        const { email, username, password, confirm_password } = value;
        dispatch(signupAction({email,username,password}))
        console.log(email, username, password, confirm_password);
        setValue({ email: "", password: "", username: "", confirm_password: "" });
    }
    useEffect(() => {
        if (isError) {
            toast.error("check username or email may already exit, please login or use different credentials")
        }
        if (success) {
            toast.success("registered succesfully!")
        }
        dispatch(reset())
   },[isError,success])
    return (
        
        <Box mt={"2rem"} height={"100vh"}>
           
            <Grid templateColumns={{base:"repeat(1fr)", md:"repeat(2, 1fr)"}} justifyItems={"center"}>
                <GridItem>
                    <Box width={{base:"20rem", md:"35rem"}}>
                        <Image src="/assets/images/banner.jpg" alt="" width={"100%"} borderRadius={"md"}/>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box>
                        {
                            pending&& (
                                <Center margin={"0.7rem 0"}>
                                     <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='blue.500'
                                        size='xl'
                                    
                                    />
                               </Center>
                            )
                         }
                        <Box mt={{base:"0.4rem", md:"0"}}>
                             <form onSubmit={handleSubmit} >
                            <Flex flexDirection={"column"} width={{base:"20rem",md:"35rem"}}>
                                <FormControl mb={"0.6rem"}>
                                    <FormLabel fontSize={"0.8rem"} >username</FormLabel>
                                    <Input value={ value.username} name="username"  onChange={handleInputChange} required  />
                                </FormControl>
                                <FormControl mb={"0.6rem"}>
                                    <FormLabel fontSize={"0.8rem"}>email</FormLabel>
                                    <Input type="email" value={value.email} name="email" onChange={handleInputChange} required    />
                                </FormControl>
                                <FormControl mb={"0.6rem"}>
                                    <FormLabel fontSize={"0.8rem"}>password</FormLabel>
                                    <Input type="password" value={value.password} name="password" onChange={handleInputChange} required  />
                                </FormControl>
                                <FormControl mb={"0.6rem"}>
                                    <FormLabel fontSize={"0.8rem"}>confirm password</FormLabel>
                                    <Input type="password" value={value.confirm_password} name="confirm_password" onChange={handleInputChange} required />
                                </FormControl>
                                <Button type="submit" mt={{ base: "0.6rem", md: "1rem" }} fontSize={"0.7rem"} colorScheme="red" isDisabled={value.password!==value.confirm_password }>sign up</Button>
                            </Flex>
                             <ToastContainer limit={1} />
                        </form>
                       </Box>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}
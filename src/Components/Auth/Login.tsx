import {
    Box, Grid, GridItem,
    FormControl, FormLabel,
    Button, Image,
    Input, Flex, Link,
    Container,Center
} from "@chakra-ui/react";
import { useState,useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { loginAction } from "@/redux/actions/login-action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reset } from "@/redux/slices/login-slice";
import { NextRouter, useRouter } from "next/router"
import NextLink from "next/link"
export interface iLogin{
    username: string;
    password: string;
}

export const Login: React.FC = () => {
     const router: NextRouter = useRouter();
    const { success, isError, error, pending,accessToken } = useAppSelector(state => state.loginAuth)
    const dispatch = useAppDispatch()
    const [data, setData] = useState<iLogin>({ username: "", password: "" })
    
    const handleInputChange = (e: React.SyntheticEvent) => { 
        const target = e.target as HTMLInputElement
        setData(prev=>({...prev,[target.name!] : target.value}))
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        const password = data.password.toLowerCase().trim()
        const username = data.username.toLowerCase().trim()
        const Data = {
            username, password
        }
        e.preventDefault()
        dispatch(loginAction(Data))
        if (success) {
            setData({ username: "", password: "" })

       }
    }

     function push(route:string) {
        router.push(route)
    }

    useEffect(() => {
        if (accessToken) {
            push(`/dashboard?token=${accessToken}`)
        }
    },[accessToken])

     useEffect(() => {
        if (isError) {
            toast.error(error)
             
        }
        dispatch(reset())
   },[isError,dispatch,error])
    
    return (
        <Box mt={"2rem"} height={"100vh"}>
            <Container>
                <Center mt={"5rem"}>
                    <Image src="/assets/images/new_logo.jpg" boxSize='50px' borderRadius='full' objectFit='cover'/>
                </Center>
              
                    <Center mt={{ base: "0.7rem", md: "0rem" }}>
                        <form onSubmit={handleSubmit}>
                            <Flex flexDirection={"column"} width={{base:"20rem",md:"35rem"}}>
                                
                                <FormControl  mb={"0.6rem"}>
                                    <FormLabel>username</FormLabel>
                                    <Input type="text" value={data.username} name="username" onChange={handleInputChange} required />
                                </FormControl>
                                <FormControl  mb={"0.6rem"}>
                                    <FormLabel>password</FormLabel>
                                    <Input type="password" value={data.password} name="password" onChange={handleInputChange}  required />
                                </FormControl>
                                {!pending ? (<Button type="submit" mt={{ base: "0.6rem", md: "1rem" }} fontSize={"0.7rem"} colorScheme="blue" >
                                    login
                                </Button>) : (
                                         <Button
                                            isLoading
                                            loadingText='Submitting'
                                            colorScheme='teal'
                                            variant='outline'
                                        >
                                            sending request....
                                        </Button>
                                    )
                               }
                            
                            </Flex>
                            <ToastContainer limit={1} />
                            <Flex justifyContent={"space-around"} mt={"2rem"}>
                                <Box>
                                    <Link href="/" mt={"0.7rem"}>Home page</Link>
                                </Box>
                                <NextLink href={"/forgotpassword"} passHref>
                                    forgot password?
                                </NextLink>
                           </Flex>
                        </form>
                    </Center>
                
            </Container>
        </Box>
    )
}

import { Box, Grid, GridItem, FormControl, FormLabel, Button, Image, Input,Flex } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { loginAction } from "@/redux/actions/login-action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reset } from "@/redux/slices/login-slice";
import { NextRouter, useRouter } from "next/router"

export interface iLogin{
    username: string;
    password: string;
}

export const Login: React.FC = () => {
     const router: NextRouter = useRouter();
    const { success, isError, error, pending } = useAppSelector(state => state.loginAuth)
    const dispatch = useAppDispatch()
    const [data, setData] = useState<iLogin>({ username: "", password: "" })
    
    const handleInputChange = (e: React.SyntheticEvent) => { 
        const target = e.target as HTMLInputElement
        setData(prev=>({...prev,[target.name!] : target.value}))
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch(loginAction(data))
        if (success) {
            setData({ username: "", password: "" })

       }
    }

     function push(route:string) {
        router.push(route)
    }

     useEffect(() => {
        if (isError) {
            toast.error(error)
             
        }
        if (success) {
            toast.success("login succes")
           push("/dashboard")
        }
        dispatch(reset())
    
        // if (success) {
        //     setTimeout(() => { push("/dashboard") }, 2000);
        //     dispatch(reset())
        //  }
         
      
   },[isError,success,dispatch,error])
    
    return (
        <Box mt={"2rem"} height={"100vh"}>
            <Grid templateColumns={{base:"repeat(1fr)", md:"repeat(2, 1fr)"}} justifyItems={"center"}>
                <GridItem>
                    <Box width={{base:"20rem", md:"35rem"}}>
                        <Image src="/assets/images/loginImg.jpeg" alt="" width={"100%"} borderRadius={"md"}/>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box mt={{ base: "0.7rem", md: "0rem" }}>
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
                                {!pending ? (<Button type="submit" mt={{ base: "0.6rem", md: "1rem" }} fontSize={"0.7rem"} colorScheme="red" >
                                    login
                                </Button>) : (
                                         <Button
                                            isLoading
                                            loadingText='Submitting'
                                            colorScheme='red'
                                            variant='outline'
                                        >
                                            sending request....
                                        </Button>
                                    )
                               }
                            
                            </Flex>
                            <ToastContainer limit={1}/>
                        </form>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}

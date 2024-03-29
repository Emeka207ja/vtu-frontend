import {
    Box,
    Image,
    FormControl, FormLabel,
    Input, Button, Flex,
    Spinner, Center,Container
} from "@chakra-ui/react"
import { useState,useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signupAction } from "@/redux/actions/signup-action";
import { reset } from "@/redux/slices/signup-slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextRouter, useRouter } from "next/router"
import NextLink from "next/link"
import useQuerryString from "@/hooks/useQueryString";

interface signupDetails{
    email: string;
    username: string;
    name: string;
    password: string;
    confirm_password: string;
    phone:string
}

export const SignupComponent: React.FC = () => {
    const router: NextRouter = useRouter();
    const dispatch = useAppDispatch()
    const { userId, success, isError, pending, error } = useAppSelector(state => state.signupAuth)
    
    const [referral] = useQuerryString()
    // console.log("query",referral)

    const [value, setValue] = useState<signupDetails>({
        email: "",
        username: "",
        name: "",
        password: "",
        confirm_password: "",
        phone:""
    })
    const [err, setErr] = useState<any>(null)
    
    function handleInputChange(e: React.SyntheticEvent):void {
        let target =( e.target!) as HTMLInputElement
        setValue(prevState => ({ ...prevState, [target.name!]: target.value }))
    }

    function push(route:string) {
        router.push(route)
    }

    function handleSubmit(e: React.SyntheticEvent): void{
        
        e.preventDefault()
        const { email: Email, username: User, password: pass, confirm_password: cpass, name: nme ,phone} = value;
        const email = Email.toLowerCase().trim()
        const username = User.toLowerCase().trim()
        const password = pass.toLowerCase().trim()
        const confirm_password = cpass.toLowerCase().trim()
        const name = nme.toLowerCase().trim()
        if (referral) {
            dispatch(signupAction({email,username,password,referral,name,phone}))
        } else {
             dispatch(signupAction({email,username,password,name,phone}))
        }
       
        
    }
    useEffect(() => {
        if (isError) {
            toast.error(error)
        }
        if (success) {
            toast.success("registered succesfully!")
            setValue({ email: "", password: "", username: "", confirm_password: "",name:"",phone:"" });
            setTimeout(()=>{push("/login")},2000)
        }
        dispatch(reset())
       
   },[isError,success, dispatch,error])
    return (
        
        <Container mt={"2rem"} mb={"1rem"}>
           
           <Center mt={"5rem"}>
                <Image src="/assets/images/new_logo.jpg" boxSize='50px' borderRadius='full' objectFit='cover'/>
            </Center>
                       
            <Center mt={{base:"0.4rem", md:"0"}}>
                <form onSubmit={handleSubmit} >
                    
                    <Flex flexDirection={"column"} width={{base:"20rem",md:"35rem"}}>
                        <FormControl mb={"0.6rem"}>
                            <FormLabel fontSize={"0.8rem"} >username</FormLabel>
                            <Input value={ value.username} name="username"  onChange={handleInputChange} required  />
                            </FormControl>
                            
                        <FormControl mb={"0.6rem"}>
                            <FormLabel fontSize={"0.8rem"} >Full name</FormLabel>
                            <Input value={ value.name} name="name"  onChange={handleInputChange} required  />
                        </FormControl>
                            
                        <FormControl mb={"0.6rem"}>
                            <FormLabel fontSize={"0.8rem"}>email</FormLabel>
                            <Input type="email" value={value.email} name="email" onChange={handleInputChange} required    />
                            </FormControl>
                            
                        <FormControl mb={"0.6rem"}>
                            <FormLabel fontSize={"0.8rem"}>phone number</FormLabel>
                            <Input  value={value.phone} name="phone" onChange={handleInputChange} required    />
                        </FormControl>
                            
                        <FormControl mb={"0.6rem"}>
                            <FormLabel fontSize={"0.8rem"}>password</FormLabel>
                            <Input type="password" value={value.password} name="password" onChange={handleInputChange} required  />
                        </FormControl>
                            
                        <FormControl mb={"0.6rem"}>
                            <FormLabel fontSize={"0.8rem"}>confirm password</FormLabel>
                            <Input type="password" value={value.confirm_password} name="confirm_password" onChange={handleInputChange} required />
                        </FormControl>
                            
                            {!pending ? (<Button type="submit" mt={{ base: "0.6rem", md: "1rem" }} fontSize={"0.7rem"} colorScheme="blue" isDisabled={value.password !== value.confirm_password}>sign up</Button>) : (
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
                </form>
               
            </Center>
            <Center textAlign={"center"} mt={"1rem"}>
                <NextLink href={"/login"} passHref>
                    already has an account? login!
                </NextLink>
            </Center>
        </Container>
    )
}

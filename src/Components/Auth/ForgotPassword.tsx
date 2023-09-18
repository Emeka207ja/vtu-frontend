import { Box,Center,FormControl,Button,FormLabel,Spinner,Flex,Input,Heading,Text,Container} from "@chakra-ui/react"
import { useState } from "react"
import { forgotpasswordService } from "./authService"
import { BsSend } from "react-icons/bs"
export const ForgotPassword: React.FC = () => {
    const [Email, setEmail] = useState("")
    const [isLoading, setIsloading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState<string | null>(null)
    
    const forgotPasswordHandler = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        setEmail(target.value)
    }
    const submitHandler = async(e: React.SyntheticEvent)=>{
        e.preventDefault()
        const email = Email.trim().toLowerCase()
        try {
            setIsloading(true)
            setSuccess(false)
            const data = await forgotpasswordService(email)
            console.log(data)
            setSuccess(true)
        } catch (error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message
            setErr(message)
            console.log(message)
        } finally {
            setIsloading(false)
        }
    }
    return (
        <Container mt={"6rem"} >
            <Center mb={"1rem"}>
                {
                    isLoading ? <Spinner /> : success? (
                        <Box color={"green"}>
                            <BsSend/> {""} email sent!
                        </Box>
                    ) : err && <Text color={"red"}>{ err}</Text>
                }
            </Center>
            <Heading fontSize={"1rem"} mb={"1rem"} textAlign={"center"}>Forgot Password</Heading>
            <Text fontSize={"0.8rem"} textAlign={"center"}>having problem remembering your password? we will send a password reset link to your mail</Text>
               
          <form onSubmit={submitHandler}>
                <FormControl w={"100%"} mt={"1rem"}>
                    <FormLabel>email</FormLabel>
                    <Input value={Email} onChange={forgotPasswordHandler} type="email"/>
                </FormControl>
                <Button type="submit" colorScheme="blue" w={"full"} mt={"0.8rem"} >submit</Button>
            </form>
          
        </Container>
    )
}
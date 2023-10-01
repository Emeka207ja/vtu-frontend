import {
    Box,
    FormControl,
    FormLabel,
    Button,
    Container,
    Center,
    Heading,
    Input,
    InputRightElement,
    InputGroup,
    IconButton,
    Text,
    Spinner,
    Image
} from "@chakra-ui/react";
import { useSearchParams,useRouter } from "next/navigation"
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { resetpasswordService } from "./authService";
export const ResetPassword: React.FC = () => {
    const [passwordDetails, setPasswordDetails] = useState<{ Password: string, confirm_password: string }>({ Password: "", confirm_password: "" })
    const [visible, setVisible] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading,setLoading] = useState(false)
    const [err, setErr] = useState<string | null>(null)
    const router = useRouter()
    const searchTerm = useSearchParams()
    const token = searchTerm.get("token")

    const inputHandler = (e: React.SyntheticEvent) => {
        setErr(null)
        const target = e.target as HTMLInputElement
        setPasswordDetails(prevState=>({...prevState,[target.name]:target.value}))
    }
    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!token) {
            return
        }
        const { Password, confirm_password } = passwordDetails
        const password = Password.trim().toLowerCase()
        const confirmPassword = confirm_password.trim().toLowerCase()
        if (password !== confirmPassword) {
            setErr("passwords must match")
            return
        }
       try {
           setLoading(true)
           setErr(null)
           setSuccess(false)
           const data = await resetpasswordService(password, token)
           setSuccess(true)
       } catch (error:any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message
            setErr(message)
            console.log(message)
       } finally {
           setLoading(false)
       }
    }
    return (
        <Container mt={"5rem"}>
            <Center>
                <Heading mb={"1rem"} fontSize={"1rem"}>Reset Password</Heading>
            </Center>
            {
                err? (
                    <Center >
                        <Text color={"red"}>{ err}</Text>
                    </Center>
                ):loading?(
                    <Center >
                        <Spinner/>
                    </Center>
                ):success &&(
                    <Center color={"green"}>
                        <BsCheck2/> {" "} password changed! please login
                    </Center>
                )
                
            }

            <Center mt={"5rem"} mb={"2rem"}>
                <Image src="/assets/images/new_logo.jpg" boxSize='50px' borderRadius='full' objectFit='cover'/>
            </Center>

            <form onSubmit={submitHandler}>
                <FormControl mb={"1rem"}>
                    <FormLabel>new password</FormLabel>
                    <InputGroup>
                        <InputRightElement>
                            <IconButton
                                aria-label='show password'
                                icon={
                                    visible?<AiFillEyeInvisible/>:<AiFillEye/>
                                }
                                onClick={()=>setVisible(prev=>!prev)}
                            />
                        </InputRightElement>
                    <Input type={visible?"text":"password"} name="Password" onChange={inputHandler} value={passwordDetails.Password}/>
                    </InputGroup>
                </FormControl>

                <FormControl mb={"1rem"}>
                    <FormLabel>confirm password</FormLabel>
                    <InputGroup>
                        <InputRightElement>
                            <IconButton
                                aria-label='show password'
                                icon={
                                    visible?<AiFillEyeInvisible/>:<AiFillEye/>
                                }
                                onClick={()=>setVisible(prev=>!prev)}
                            />
                        </InputRightElement>
                    <Input type={visible?"text":"password"} name="confirm_password" onChange={inputHandler} value={passwordDetails.confirm_password} />
                    </InputGroup>
                </FormControl>

                <Button w={"full"} mt={"1rem"} colorScheme="blue" type="submit">submit</Button>
            </form>
       </Container>
    )
}
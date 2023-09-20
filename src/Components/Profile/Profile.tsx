import {
    Box,
    FormControl,
    Circle,
    FormLabel,
    Container,
    VStack,
    Image,
    Input,
    Button,
    Select,
    Spinner,
    Center
} from "@chakra-ui/react";
import { AiFillCamera } from "react-icons/ai";
import { ChangeEvent, useRef, useState,useEffect } from "react";
import { getProfile } from "../Dashboard/service";
import { iProfile } from "@/redux/interface/profileInterface";
import { useAppSelector } from "@/redux/hooks";
export const Profile: React.FC = () => {
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [img, setImg] = useState<any>()
    const [preview, setPreview] = useState<any>("")
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState<iProfile | null>(null)
    const [errMessage,setErrmsg] = useState("")
    const { accessToken } = useAppSelector(state => state.loginAuth)
    const [user, setUser] = useState<
        { email: string|null, username: string|null,  name: string|null, image: string | null }
    >({ email: "",username:"",name:"",image:"" })

    const handleFile = (e:ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData()
        e.target.files && setImg(e.target.files[0])

        const reader = new FileReader()
        if ( e.target.files &&  e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            reader.onloadend = () => {
                setPreview(reader.result)
            }
       }
    }
    
    const fetchProfile = async () => {
        if (!accessToken) {
            return
        }
        try {
            setLoading(true)
            const data: iProfile = await getProfile(accessToken)
            setUser({
                email: data.email,
                name: data.name,
                username: data.username,
                image: data.image
                
            })
            console.log(data)
        } catch (error:any) {
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErrmsg(message)
        } finally {
            setLoading(false)
        }
    }
    const InputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUser(prevState=>({...prevState,[e.target.name]:e.target.value}))
    }

    useEffect(() => {
        fetchProfile()
    },[])
    return (
        <Container mt={"2rem"}>
            <VStack>
                {
                    loading && (
                        <Center mb={"1rem"}>
                            <Spinner/>
                        </Center>
                    )
                }
                <Circle size='7rem' bg='blue.700' color='white' pos={"relative"} zIndex={1}>
                    <input type="file" ref={fileRef} hidden onChange={handleFile} accept="image/*"/>
                    <Box  zIndex={100} left={preview?"3rem":""} position={"absolute"}>
                        <AiFillCamera onClick={() => fileRef.current?.click()} size={"1.5rem"} color="red"/>
                    </Box>
                    {
                        profile?.image || preview && <Image
                            src={preview || profile?.image}
                            alt=""
                            borderRadius='full'
                            objectFit='cover'
                            boxSize='7rem'
                            zIndex={10}
                        />
                    }
                </Circle>
                <form>
                    <FormControl>
                        <FormLabel>
                            Username
                        </FormLabel>
                        <Input name="username" value={user.username!} readOnly/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                           Email
                        </FormLabel>
                        <Input name="email" value={user.email!} readOnly/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                           Full name
                        </FormLabel>
                        <Input name="name" value={user.name!} readOnly/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>
                          Sex
                        </FormLabel>
                        <Select>
                            <option value={"male"}>male</option>
                            <option value={"female"}>female</option>
                       </Select>
                    </FormControl>
                    <Button width={"full"} mt={"1rem"} colorScheme="blue" isActive> update</Button>
                </form>
           </VStack>
        </Container>
    )
}
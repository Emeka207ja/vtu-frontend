import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center,
    Spinner,
    Text,
    Button
} from "@chakra-ui/react"
import { getAllUsersService } from "./user.service"
import { useState, useEffect } from "react"
import { useAppSelector } from "@/redux/hooks"
import { iProfile } from "@/redux/interface/profileInterface"

export const AllUserList: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState<string | null>(null)
    const [users,setUsers] = useState<iProfile[]|null>(null)

    const {accessToken} = useAppSelector(state=>state.loginAuth)
    
    const getAllUsersHandler = async () => {

        if (!accessToken) return
        
        try {
            setLoading(true)
            const data:iProfile[] = await getAllUsersService(accessToken)
            setUsers(data)
        } catch (error:any) {
            const message: string = (error.response && error.response.data && error.response.data.message) || error.message
            setErr(message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllUsersHandler()
    },[])
    return (
        <Box mt={"2rem"}>
            <Heading fontSize={"1rem"} mb={"2rem"}>All users</Heading>
            <Center>
                {
                    loading ? <Spinner /> : err && <Text color={"red"}>{err }</Text>
                }
            </Center>
            <TableContainer >
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>id</Th>
                        <Th>username</Th>
                        <Th>more details</Th>
                        <Th>limit user</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                         {
                           users && users.map((user,id) => {
                                return (
                                    <Tr key={user.id}>
                                        <Td>{ id+1}</Td>
                                        <Td>{ user.username}</Td>
                                        <Td>
                                            <Button
                                                as={"a"}
                                                href={`/admin/updatebalance?user=${user.username}`}
                                                cursor={"pointer"}
                                                colorScheme="blue"
                                            >view</Button>
                                       </Td>
                                        <Td>
                                            <Button 
                                                cursor={"pointer"}
                                                colorScheme="red"
                                            >ban</Button>
                                       </Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}
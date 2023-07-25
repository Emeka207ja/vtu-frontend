import {
    Box,
    Input,
    Grid,
    Select,
    FormControl,
    FormLabel,
    HStack,
    Button,
    useDisclosure,
    Modal,
    ModalBody,
    ModalHeader,
    Text,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    ModalCloseButton
} from "@chakra-ui/react";

import { iVar } from "../Data/iProfvider";
import { getDataVars } from "../Data/service";
import { useState, useEffect } from "react";
import { iformData, formData } from "./iwaec";



export const WaecRegister: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [vars, setVars] = useState<iVar[] | []>([])
    const [formdata, setFormdata] = useState<iformData>(formData)
    const [price,setPrice] = useState<string>("")
    
    const handleInput = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setFormdata(prev => ({
            ...prev,[target.name]:target.value
        }))
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(formdata)
    }
    
    const varsHandler = async () => {
        try {
            const data = await getDataVars("waec-registration")
            if (data) {
                const vararations: iVar[] = data.content?.varations
                setVars(vararations)
            }
            console.log(data)
        } catch (error:any) {
            console.log(error)
        }
    }

    useEffect(() => {
        varsHandler()
    }, [])
    
    useEffect(() => {
       
        if (vars.length > 0) {
            const varCode: string = formdata.varCode;
            const selected: iVar[] = vars.filter(item => item.variation_code === varCode)
            if (selected) {
                const amt: string = selected[0]?.variation_amount
                setPrice(amt)
            }
        }
       
    },[formdata.varCode])
    
    return (
        <Box mt={"2rem"}>
            <form onSubmit={handleSubmit}>
                <Grid gridTemplateColumns={{base:"repeat(1,1fr)",md:"repeat(2,1fr)"}} gap={"2rem"}>
                    <FormControl>
                        <FormLabel fontSize={"0.8rem"}>Exam Type</FormLabel>
                        <Select name="varCode" value={formdata.varCode} onChange={handleInput} onClick={handleInput}>
                            {
                                vars.length > 0 && vars.map(item => (<option value={item.variation_code} key={item.name}>{ item.name}</option>))
                            }
                       </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"0.8rem"}>Phone number</FormLabel>
                        <Input name="phone" value={formdata.phone} onChange={handleInput}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"0.8rem"}>Amount</FormLabel>
                        <Input value={price} readOnly/>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontSize={"0.8rem"}>Quantity</FormLabel>
                        <Input name="quantity" value={formdata.quantity} onChange={handleInput}/>
                    </FormControl>
                </Grid>
                <Box mt={"1rem"}>
                    <HStack spacing={"1rem"}>
                        {/* <Button colorScheme="red"  onClick={onOpen}>cancel</Button> */}
                        <Button colorScheme="red">cancel</Button>
                        <Button colorScheme="blue" type="submit">proceed</Button>
                    </HStack>
                </Box>
            </form>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                   <Text>hii</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
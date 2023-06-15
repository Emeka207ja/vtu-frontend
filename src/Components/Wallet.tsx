import { Box, Text, Heading,Grid,GridItem ,HStack,useColorMode} from "@chakra-ui/react"
// import { Payment } from "./Payment"
import { Payment } from "./Payment"
import { useAppSelector } from "@/redux/hooks"

export const Wallet = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const {Profile} = useAppSelector(state=>state.fetchProfile)
    return (
        <Box>
         
            <Box>
                <Heading textAlign={"center"} fontSize={"1rem"} margin={"0.9rem 0"}>Fund wallet</Heading>
                <Payment/>
            </Box>

        </Box>
    )
}
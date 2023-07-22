import { Box, Card, CardBody, CardFooter, CardHeader,PinInput,PinInputField,Heading,Text } from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { useState,useEffect } from "react"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useAppDispatch,useAppSelector } from "@/redux/hooks"


export const ConfirmCarInsurance: React.FC = () => {
    const {accessToken} = useAppSelector(state=>state.loginAuth)
    const { Profile } = useAppSelector(state => state.fetchProfile)
    const dispatch = useAppDispatch()

    const [Insured_Name] = useQuerryString("name")
    const [variation_code] = useQuerryString("vcode")
    const [Engine_Number] = useQuerryString("engine")
    const [Chasis_Number] = useQuerryString("chasis")
    const [Plate_Number] = useQuerryString("plate")
    const [Vehicle_Make] = useQuerryString("make")
    const [Vehicle_Color] = useQuerryString("color")
    const [Vehicle_Model] = useQuerryString("model")
    const [Year_of_Make] = useQuerryString("year")
    const [Contact_Address] = useQuerryString("address")
    const [Amount] = useQuerryString("price")
    
    useEffect(() => {
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    },[accessToken])
    return (
        <Box>
            <Card>
                <CardHeader>
                    <Heading fontSize={"1rem"}>Confirm vehicle insurance purchase</Heading>
                </CardHeader>
                <CardBody>
                    <Text>product: vehicle insurance</Text>
                    <Text>type: {variation_code}</Text>
                    <Text>Price : {Amount }</Text>
                </CardBody>
           </Card>
        </Box>
    )
}
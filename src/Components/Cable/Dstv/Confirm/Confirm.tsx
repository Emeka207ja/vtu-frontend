import { Box, Heading } from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { useState, useEffect } from "react"
import { ConfirmNewSub } from "./ConfirmNewSub"
import { ConfirmRenewal } from "./ConfirmRenewal"


export const ConfirmDstv: React.FC = () => {
    const [subscription_type] = useQuerryString("subType")
    return (
        <Box>
            {
                subscription_type ==="change"?(<ConfirmNewSub/>):subscription_type ==="renew"?(<ConfirmRenewal/>):<Heading>No data</Heading>
           }
        </Box>
    )
}
import { Box, Heading } from "@chakra-ui/react"
import useQuerryString from "@/hooks/useQueryString"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useState, useEffect } from "react"


export const ConfirmNewSub:React.FC = () => {
    return (
        <Box>Confirm New Sub</Box>
    )
}
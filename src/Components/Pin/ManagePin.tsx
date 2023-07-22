import { Box } from "@chakra-ui/react"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useState, useEffect } from "react"
import { UpdatePin } from "./UpdatePin"
import { ChangePin } from "./ChangePin"


export const ManagePin: React.FC = () => {
    const dispatch = useAppDispatch()
    const { accessToken } = useAppSelector(state => state.loginAuth)
    const {Profile} = useAppSelector(state=>state.fetchProfile)
    


    useEffect(() => {
        if (accessToken) {
            dispatch(getProfileAction(accessToken))
        }
    },[accessToken])
    return (
        <Box>
            {
                !Profile?.defaultPinChanged? (<UpdatePin/>): (<ChangePin/>)
            }
        </Box>
    )
}
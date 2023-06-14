import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getProfileAction } from "@/redux/actions/getProfile.action"
import { useEffect } from "react"

export const useFetchProfile = () => {
    const dispatch = useAppDispatch()
    const {Profile} = useAppSelector(state=>state.fetchProfile)
    useEffect(() => {
        dispatch(getProfileAction())
    }, [])
    return {Profile}
}
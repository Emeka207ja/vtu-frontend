import { Box } from "@chakra-ui/react"
import { Layout } from "@/Components/Layout/Layout"
import { SignupComponent } from "@/Components/Auth/Signup"
import NotAuthHeader from "@/Components/Dashboard/NotAuthDassboard"

export default function signup(){
    return (
        <NotAuthHeader>
             <SignupComponent/>
      </NotAuthHeader>
    )
}
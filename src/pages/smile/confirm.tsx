import { Box } from "@chakra-ui/react"
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper"
import { ConfirmSmile } from "@/Components/Smile/Confirm"

export default function confirm() {
    return (
        <SidebarWithHeader>
           <ConfirmSmile/>
        </SidebarWithHeader>
    )
}
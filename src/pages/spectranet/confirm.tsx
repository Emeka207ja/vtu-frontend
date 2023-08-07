import { Box } from "@chakra-ui/react"
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper"
import { ConfirmSpectranet } from "@/Components/Spectranet/Confirm"

export default function confirm() {
    return (
        <SidebarWithHeader>
           <ConfirmSpectranet/>
        </SidebarWithHeader>
    )
}
import { Box } from "@chakra-ui/react"
import { Referral } from "@/Components/Referral"
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";


export default function referral() {
    return (
        <SidebarWithHeader>
            <Referral/>
      </SidebarWithHeader>
    )
}
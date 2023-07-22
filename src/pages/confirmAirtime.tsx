// import { Box } from "@chakra-ui/react"

import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { ConfirmAirtime } from "@/Components/Airtime/ConfirmAirtime";

export default function confirmAirtime() {
    return (
        <SidebarWithHeader>
            <ConfirmAirtime/>
        </SidebarWithHeader>
    )
}

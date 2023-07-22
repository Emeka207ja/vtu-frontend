import { Box } from "@chakra-ui/react"
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Peer } from "@/Components/Peer/Peer";


export default function peer() {
    return (
        <SidebarWithHeader>
            <Peer/>
        </SidebarWithHeader>
    )
} 
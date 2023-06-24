import { Box } from "@chakra-ui/react"
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Peer } from "@/Components/Peer";


export default function peer() {
    return (
        <SidebarWithHeader>
            <Peer/>
        </SidebarWithHeader>
    )
} 
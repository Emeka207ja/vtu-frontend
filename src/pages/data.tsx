import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Box } from "@chakra-ui/react"
import { Data } from "@/Components/Data";

export default function data(){
    return (
        <SidebarWithHeader>
            <Data/>
        </SidebarWithHeader>
    )
}
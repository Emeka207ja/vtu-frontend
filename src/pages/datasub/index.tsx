import { Box } from "@chakra-ui/react"
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { DataSub } from "@/Components/Data/DataSub";


export default function datasub() {
    return (
        <SidebarWithHeader>
          <DataSub/>
        </SidebarWithHeader>
    )
} 
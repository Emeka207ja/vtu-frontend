import { Admin } from "@/Components/Admin/Admin";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Box } from "@chakra-ui/react";
import { FailedData } from "@/Components/Admin/Refunds/Data/AllFailedData";

export default function geodata() {
    return (
        <SidebarWithHeader>
           <FailedData/>
        </SidebarWithHeader>
    )
}
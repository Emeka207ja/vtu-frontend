import { Box } from "@chakra-ui/react";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Confirm } from "@/Components/Electricity/Confirm";

export default function confirm() {
    return (
        <SidebarWithHeader>
            <Confirm/>
        </SidebarWithHeader>
    )
}
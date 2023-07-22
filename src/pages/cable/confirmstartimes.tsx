import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Box } from "@chakra-ui/react";
import { ConfirmStartimes } from "@/Components/Cable/Startimes/ConfirmStartimes";

export default function confirmstartimes() {
    return (
        <SidebarWithHeader>
            <ConfirmStartimes/>
        </SidebarWithHeader>
    )
}
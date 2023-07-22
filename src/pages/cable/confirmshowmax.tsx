import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Box } from "@chakra-ui/react";
import { ConfirmShowmax } from "@/Components/Cable/Showmax/ConfirmShowmax";

export default function confirmshowmax() {
    return (
        <SidebarWithHeader>
            <ConfirmShowmax/>
        </SidebarWithHeader>
    )
}
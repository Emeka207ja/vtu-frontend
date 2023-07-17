import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Box } from "@chakra-ui/react"
import { ConfirmDstv } from "@/Components/Cable/Dstv/Confirm/Confirm";

export default function confirmdstv() {
    return (
        <SidebarWithHeader>
            <ConfirmDstv/>
        </SidebarWithHeader>
    )
}
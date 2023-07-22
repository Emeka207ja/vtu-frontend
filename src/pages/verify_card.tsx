import { Box } from "@chakra-ui/react";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { VerifyCard } from "@/Components/VerifyCard";

export default function verify_card() {
    return (
        <SidebarWithHeader>
           <VerifyCard/>
        </SidebarWithHeader>
    )
}
import { Box } from "@chakra-ui/react";
import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Form } from "@/Components/Electricity/Form";

export default function subElectric() { 
    return (
        <SidebarWithHeader>
            <Form/>
        </SidebarWithHeader>
    )
}
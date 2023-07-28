import SidebarWithHeader from "@/Components/Dashboard/DashboardWrapper";
import { Box, Button, Link,Center } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Home } from "@/Components/Dashboard/Home";

export default function welcomePage() {
    return (
        <SidebarWithHeader>
           <Home/>
        </SidebarWithHeader>
    )
}